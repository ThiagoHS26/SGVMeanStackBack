var Compra = require('../models/compra');
var DetalleCompra = require('../models/detallecompra');
var Producto = require('../models/producto');

function registrar(req, res){
    var suma_total = 0;
    var compra = new Compra();
    let data = req.body;
    let detalles = data.detalles;
    //console.log(detalles);
    detalles.forEach((element,index)=>{
        var detallecompra = new DetalleCompra();
        detallecompra.idproducto = element.idproducto;
        detallecompra.cantidad = element.cantidad;
        //Capturar precio de compra del producto
        Producto.findById({_id:element.idproducto},(err,precio_producto)=>{
            if(precio_producto){
                //calculo del subtotal 
                detallecompra.subtotal = parseFloat(precio_producto.precio_compra) * parseInt(element.cantidad);
                suma_total = suma_total + parseFloat(detallecompra.subtotal);
                detallecompra.compra = compra.id;
                //Guardar el documento Detalle de compra
                detallecompra.save((err,detalle_save)=>{
                    if(detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock:parseInt(producto_data.stock) + 
                                    parseInt(element.cantidad)},(err,producto_edit)=>{
                                        res.end();
                                    });
                            }else{
                                res.send('No se encontró el producto');
                            }
                        });
                        compra.idproveedor = data.idproveedor;
                        compra.iduser = data.iduser;
                        compra.factura = data.factura;
                        compra.total = suma_total;
                        compra.save((err,compra_save)=>{
                        if({compra_save}){
                            //parametros de validacion
                        }
                });
                    }else{
                        res.send('No se pudo registrar la compra');
                        //console.log(err);
                    }
                });
  
            }
                
        });
    });

}

function datos_compra(req,res) {
    var id = req.params['id'];
    Compra.findById(id).populate('idproveedor').populate('iduser').exec((err,data_compra)=>{
        if(data_compra){
            DetalleCompra.find({compra:data_compra._id}).populate('idproducto').exec({idcompra:id},(err,data_detalle)=>{
                if(data_detalle){
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
        if(data_compras){
            res.status(200).send({
                compras:data_compras
            });
        }else{
            res.status(404).send({
                msg:'No hay registro de compras'
            });
        }
    });
}

function detalles_compra(req,res){
    var id = req.params['id'];
    DetalleCompra.find({compra:id}).populate('idproducto').exec((err,data_detalle)=>{
        if(data_detalle){
            res.status(200).send({
                detalles:data_detalle
            });
        }else{
            res.status(404).send({
                msg:'No hay registro de compras'
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