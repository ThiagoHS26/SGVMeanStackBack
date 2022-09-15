var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

function registrar(req, res){
    var suma_total = 0;
    var venta = new Venta();
    let data = req.body;
    let detalles = data.detalles;
    //console.log(detalles);
    detalles.forEach((element,index)=>{
        var detalleventa = new DetalleVenta();
        detalleventa.idproducto = element.idproducto;
        detalleventa.cantidad = element.cantidad;
        //Capturar precio de venta del producto
        Producto.findById({_id:element.idproducto},(err,precio_producto)=>{
            if(precio_producto){
                //calculo del subtotal 
                detalleventa.subtotal = parseFloat(precio_producto.precio_venta) * parseInt(element.cantidad);
                suma_total = suma_total + parseFloat(detalleventa.subtotal);
                detalleventa.venta = venta.id;
                //Guardar el documento Detalle de venta
                detalleventa.save((err,detalle_save)=>{
                    if(detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock:parseInt(producto_data.stock) - 
                                    parseInt(element.cantidad)},(err,producto_edit)=>{
                                        res.end();
                                    });
                            }else{
                                res.send('No se encontró el producto');
                            }
                        });
                        venta.idcliente = data.idcliente;
                        venta.iduser = data.iduser;
                        venta.total = suma_total;
                        venta.save((err,venta_save)=>{
                        if({venta_save}){
                            //parametros de validacion
                        }
                });
                    }else{
                        res.send('No se pudo registrar la venta');
                        //console.log(err);
                    }
                });
  
            }
                
        });
    });

}

//listado individual de ventas
function datos_venta(req,res) {
    var id = req.params['id'];
    Venta.findById(id).populate('idcliente').populate('iduser').exec((err,data_venta)=>{
        if(data_venta){
            DetalleVenta.find({venta:data_venta._id}).populate('idproducto').exec({idventa:id},(err,data_detalle)=>{
                if(data_detalle){
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
        if(data_ventas){
            res.status(200).send({
                ventas:data_ventas
            });
        }else{
            res.status(404).send({
                msg:'No hay registro de ventas'
            });
        }
    });
}

function detalles_venta(req,res){
    var id = req.params['id'];
    DetalleVenta.find({venta:id}).populate('idproducto').exec((err,data_detalle)=>{
        if(data_detalle){
            res.status(200).send({
                detalles:data_detalle
            });
        }else{
            res.status(404).send({
                msg:'No hay registro de ventas'
            });
        }
    });
}

module.exports ={
    registrar,
    datos_venta,
    listado_venta,
    detalles_venta
}