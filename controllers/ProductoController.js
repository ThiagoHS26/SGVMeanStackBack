var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

function registrar(req, res){
    let data = req.body;
    let producto = new Producto();
        
    producto.codigo = data.codigo;
    producto.titulo = data.titulo;
    producto.marca = data.marca;
    producto.descripcion = data.descripcion;
    producto.precio_compra = data.precio_compra;
    producto.precio_venta = data.precio_venta;
    producto.stock = 0;
    producto.idcategoria = data.idcategoria;
    producto.puntos = 0;

    producto.save((err,producto_save)=>{
        if(err){
            res.status(500).send({
                msg: 'Error en el servidor!'
            });
        }else{
            if(producto_save){
                res.status(200).send({
                    msg:'Producto registrado correctamente!',
                    produto: producto_save
                });
            }else{
                res.status(402).send({
                    message: 'No se registró el producto!'
                }); 
            }
        }
    });

}

function listar(req, res){
    var titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo, 'i')}).populate('idcategoria').exec((err,productos_listado)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor'
            });
        }else{
            if(productos_listado){
                res.status(200).send({
                    msg:'Producto por nombre!',
                    productos: productos_listado
                });
            }else{
                res.status(403).send({
                    msg:'No existen el producto'
                });
            }
        }
    });
}

function editar(req, res){
    let data = req.body;
    let id = req.params['id'];

    Producto.findByIdAndUpdate({_id: id},{
        codigo:data.codigo,
        titulo:data.titulo,
        marca:data.marca,
        descripcion:data.descripcion,
        precio_compra:data.precio_compra,
        precio_venta:data.precio_venta,
        stock : data.stock,
        idcategoria:data.idcategoria,
        puntos:data.puntos
    },(err,producto_edit)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(producto_edit){
                res.status(200).send({
                    msg:'Producto actualizado correctamente!',
                    productos: producto_edit
                });
            }else{
                res.status(403).send({
                    msg:'No se edito el producto!'
                });
            }
        }
    });
    
}

function obtener_producto(req,res){
    var id = req.params['id'];

    Producto.findOne({_id:id},(err,producto_data)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor'
            });
        }else{
            if(producto_data){
                res.status(200).send({
                    msg:'Producto por id',
                    producto: producto_data
                });
            }else{
                res.status(403).send({
                    msg:'No existe el producto'
                });
            }
        }
    });
}

function eliminar(req,res){
    var id = req.params['id'];

    Producto.findByIdAndRemove({_id:id},(err,producto_delete)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(producto_delete){
                res.status(200).send({
                    msgn:'Producto eliminado correctamente!'
                });
            }else{
                res.status(403).send({
                    msg:'No se elimino ningun producto!'
                });
            }
        }
    });
}

function update_stock(req,res){
    let id = req.params['id'];
    let data = req.body;

    Producto.findByIdAndUpdate({_id:id},{stock:data.stock},
        (err,data)=>{
            if(err){
                res.status(500).json({
                    msg:'Error en el servidor!'
                });
            }else if(!data){
                res.status(400).json({
                    msg:'No se encontró el producto!'
                });
            }else{
                res.status(200).send({
                    msg:'Stock actualizado!',
                    stock:data
                });
            }
        });

        /*
    Producto.findById(id, (err,producto_data)=>{
        if(producto_data){
            Producto.findByIdAndUpdate(id,{stock:parseInt(producto_data.stock)+parseInt(data.stock)},(err,producto_edit)=>{
                if(producto_edit){
                    res.status(200).send({
                        producto: producto_edit
                    });
                }
            });
        }else{
            res.status(500).send({
                err
            });
        }
    });*/
}

function get_img(req,res){
    var img = req.params['img'];

    if(img != "null"){
        let path_img = './uploads/productos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(path_img));
    }
}
module.exports ={
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img
}