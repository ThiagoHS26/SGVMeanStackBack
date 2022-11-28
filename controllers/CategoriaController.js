var Categoria = require('../models/categoria');

function registrar(req,res){
    let data = req.body;
    let categoria = new Categoria();
    categoria.codigo = data.codigo;
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err,categoria_save)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(categoria_save){
                res.status(200).send({
                    msg:'Categoría agregada correctamente!',
                    categoria: categoria_save
                });
            }else{
                res.status(403).send({
                    msg:'No se pudo registrar la categoría!'
                });
            }
        }
    });
}

function obtener_categoria(req,res){
    var id = req.params['id'];
    //console.log(id);
    Categoria.findById({_id: id}, (err,categoria_data)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(categoria_data){
                res.status(200).send({
                    msg:'Categoría!',
                    categoria: categoria_data
                });
            }else{
                res.status(403).send({
                    msg:'La categoría no existe!'
                });
            }
        }
    });
}

function editar(req,res) { 
    let id = req.params['id'];
    let data = req.body;
    Categoria.findByIdAndUpdate({_id: id},{
        titulo: data.titulo, 
        codigo:data.codigo,
        descripcion: data.descripcion
    },(err,categoria_edit)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(categoria_edit){
                res.status(200).send({
                    msg:'Categoría actualizada correctamente!',
                    categoria: categoria_edit
                });
            }else{
                res.status(403).send({
                    msg:'No se pudo actualizar la categoría!'
                })
            }
        }
    });
}

function eliminar(req,res){
    var id = req.params['id'];

    Categoria.findByIdAndRemove({_id:id},(err,categoria_delete)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(categoria_delete){
                res.status(200).send({
                    msg:'Categoría eliminada correctamente!'
                })
            }else{
                res.status(403).send({
                    msg:'No se pudo eliminar la categoría!'
                })
            }
        }
    });
}

function listar(req,res){
    Categoria.find((err,categoria_listado)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(categoria_listado){
                res.status(200).send({
                    msg:'Categorías!',
                    categorias: categoria_listado
                })
            }else{
                res.status(403).send({
                    msg:'No existen registros!'
                })
            }
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
}