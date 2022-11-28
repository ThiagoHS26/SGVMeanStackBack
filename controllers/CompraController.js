const { vision_v1p1beta1 } = require('googleapis');
var Compra = require('../models/compra');
var DetalleCompra = require('../models/detallecompra');
var Producto = require('../models/producto');

function registrar(req, res){
    var compra = new Compra();
    let data = req.body;
    let detalles = data.detalles;
    var suma_total = 0;
    var subtotal = 0;
    /*Calculo del total de la compra 
    los detalles de la compra se calculan dentro del arrar detalles y el resultado final se 
    almacena en la variable total de la entidad Venta*/
    detalles.forEach(element => {
        //subtotal
        subtotal = parseFloat(element.cantidad * element.precio_compra);
        var detallecompra = new DetalleCompra();
        detallecompra.idproducto = element.idproducto;
        detallecompra.cantidad = element.cantidad;
        detallecompra.subtotal = subtotal;
        detallecompra.compra = compra._id;
        detallecompra.save();
        suma_total = parseFloat(element.cantidad * element.precio_compra)+suma_total;
        Producto.findById({_id:element.idproducto},(err,info)=>{
            if(info){
                Producto.findByIdAndUpdate({_id:info._id},
                    {stock:parseInt(info.stock)+parseInt(element.cantidad)},
                    (err,edit)=>{
                        if(edit){
                            console.log("stock actualizado");
                        }else{
                            console.log("erro",err);
                        }
                    });
            }else{
                console.log("no se encontro",err);
            }
        });
    });
    
    /*Registrar la compra */
    compra.idproveedor = data.idproveedor;
    compra.iduser = data.iduser;
    compra.tipo_documento = data.tipo_documento;
    compra.factura = data.factura,
    compra.total = suma_total;
    compra.save((err,save)=>{
        if(err){
            res.status(500).json({msg:'Error en el servidor!'});
        }else if(!save){
            res.status(400).json({msg:'No se registró la compra!'});
        }else{
            res.status(200).send({
                msg:'Compra registrada!',
                compra:save
            });
        }
    });

}

function datos_compra(req,res) {
    var id = req.params['id'];
    Compra.findById(id).populate('idproveedor').populate('iduser').exec((err,data_compra)=>{
        if(err){
            res.status(500).json(err);
        }else if(!data_compra){
            res.status(404).json();
        }else{
            DetalleCompra.find({compra:data_compra._id}).populate('idproducto').exec({idcompra:id},(err,data_detalle)=>{
                if(err){
                    res.status(500).json(err);
                }else if(!data_detalle){
                    res.status(404).json();
                }else{
                    res.status(200).send({
                        data : {
                            compra:data_compra,
                            detalles: data_detalle
                        }
                    });
                }
            });
        }
    });
}

function listado_compra(req,res){
    //var suma_total =0;
    Compra.find().populate('idproveedor').populate('iduser').exec((err,data_compras)=>{
        if(err){
            res.status(500).json(err)
        }else if(!data_compras){
            res.status(404).json();
        }else{
            res.status(200).send({
                compras:data_compras
            });
        }
    });
}

function detalles_compra(req,res){
    var id = req.params['id'];
    DetalleCompra.find({compra:id}).populate('idproducto').exec((err,data_detalle)=>{
        if(err){
            res.status(500).json(err)
        }else if(!data_detalle){
            res.status(404).json();
        }else{
            res.status(200).send({
                detalles:data_detalle
            });
        }
    });
}

module.exports = {
    registrar,
    datos_compra,
    listado_compra,
    detalles_compra
}