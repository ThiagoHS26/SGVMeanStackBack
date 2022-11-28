var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');
var Cliente = require('../models/cliente');

function registrar(req, res){
    var venta = new Venta();
    let data = req.body;
    let detalles = data.detalles;
    var suma_total = 0;
    var subtotal = 0;
    /*Calculo del total de la venta 
    los detalles de la venta se calculan dentro del arrar detalles y el resultado final se 
    almacena en la variable total de la entidad Venta*/
    detalles.forEach(element => {
        //subtotal
        subtotal = parseFloat(element.cantidad * element.precio_venta);
        var detalleventa = new DetalleVenta();
        detalleventa.idproducto = element.idproducto;
        detalleventa.cantidad = element.cantidad;
        detalleventa.subtotal = subtotal;
        detalleventa.venta = venta._id;
        detalleventa.save();
        suma_total = parseFloat(element.cantidad * element.precio_venta)+suma_total;
        Producto.findById({_id:element.idproducto},(err,info)=>{
            if(info){
                //Actualizar stock
                Producto.findByIdAndUpdate({_id:info._id},
                    {stock:parseInt(info.stock)-parseInt(element.cantidad)},
                    (err,edit)=>{
                        if(edit){
                            console.log("stock actualizado");
                        }else{
                            console.log("erro",err);
                        }
                    });
                //Puntajes de cada producto
                Producto.findByIdAndUpdate({_id:info._id},
                    {puntos:parseInt(info.puntos)+1},
                    (err,edit)=>{
                        if(edit){
                            console.log("puntos actualizados");
                        }else{
                            console.log("erro",err);
                        }
                    });
            }else{
                console.log("no se encontro",err);
            }
        });
        Cliente.findById({_id:data.idcliente},(err,info)=>{
            if(info){
                //Rankear cliente
                Cliente.findByIdAndUpdate({_id:info._id},
                    {puntos:parseInt(info.puntos) + 1},(err,edit)=>{
                        if(edit){
                            console.log("Ranked");
                        }else{
                            console.log("No ranked",err);
                        }
                    });
            }else{
                console.log("not founded",err);
            }
        });
    });
    
    /*Registrar la venta */
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;
    venta.tipo_documento = data.tipo_documento;
    venta.factura = data.factura,
    venta.total = suma_total;
    venta.save((err,save)=>{
        if(err){
            res.status(500).json({msg:'Error en el servidor!'});
        }else if(!save){
            res.status(400).json({msg:'No se registró la venta!'});
        }else{
            res.status(200).send({
                msg:'Venta registrada!',
                venta:save
            });
            console.log(save);
        }
    });

}

//listado individual de ventas
function datos_venta(req,res) {
    var id = req.params['id'];
    Venta.findById(id).populate('idcliente').populate('iduser').exec((err,data_venta)=>{
        if(err){
            res.status(500).json(err);
        }else if(!data_venta){
            res.status(404).json();
        }else{
            DetalleVenta.find({venta:data_venta._id})
            .populate('idproducto')
            .exec({idventa:id},(err,data_detalle)=>{
                if(err){
                    res.status(500).json(err);
                }else if(!data_detalle){
                    res.status(404).json();
                }else{
                    res.status(200).send({
                        data : {
                            venta:data_venta,
                            detalles: data_detalle
                        }
                    });
                }
            });
        }
    });
}

function listado_venta(req,res){
    //var suma_total =0;
    Venta.find().populate('idcliente').populate('iduser').exec((err,data_ventas)=>{
        if(err){
            res.status(500).json(err);
        }else if(!data_ventas){
            res.status(404).json();
        }else{
            res.status(200).send({
                ventas:data_ventas
            });
        }
    });
}

function detalles_venta(req,res){
    var id = req.params['id'];
    DetalleVenta.find({venta:id}).populate('idproducto').exec((err,data_detalle)=>{
        if(err){
            res.status(500).json(err);
        }else if(!data_detalle){
            res.status(404).json();
        }else{
            res.status(200).send({
                detalles:data_detalle
            });
        }
    });
}

//Reportes por fechas 
function reporte_ventas(req, res){
    var from_date = req.params['fecha']
    console.log(from_date);
}

module.exports ={
    registrar,
    datos_venta,
    listado_venta,
    detalles_venta,
    reporte_ventas
}