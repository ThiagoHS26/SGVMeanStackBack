var Proveedor = require('../models/proveedor');

function registrar(req,res) {
    var data = req.body;

    Proveedor.findOne({ci:data.ci},(err,cedula_valid)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(cedula_valid){
                res.status(400).send({
                    msg:'El proveedor ya está registrado!'
                });
            }else{
                let proveedor = new Proveedor();
                proveedor.nombres = data.nombres;
                proveedor.ci = data.ci;
                proveedor.ruc = data.ci+"001";
                proveedor.correo = data.correo;
                proveedor.empresa = data.empresa;
                proveedor.telefono = data.telefono;
                proveedor.direccion = data.direccion;
                proveedor.save((err,proveedor_save)=>{
                    if(err){
                        res.status(500).send({
                            msg:'Error en el servidor!'
                        });
                    }else{
                        if(proveedor_save){
                            res.status(200).send({
                                msg:'Proveedor agregado correctamente!',
                                proveedor:proveedor_save
                            });
                        }else{
                            res.status(403).send({
                                msg:'No se pudo registrar el proveedor!'
                                });
                            }
                    }
                });
            }
        }
    });

}

function listar(req,res){
    Proveedor.find((err,proveedor_data)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(proveedor_data){
                res.status(200).send({
                    msg:'Proveedores!',
                    proveedores:proveedor_data,
                });
            }else{
                res.status(403).send({
                    msg:'No se encontraron registros!'
                });
            }
        }
    })
}

function editar(req, res) {  
    let id = req.params['id'];
    let data = req.body;

    Proveedor.findByIdAndUpdate({_id:id},{
        
        nombres: data.nombres,
        correo: data.correo,
        empresa:data.empresa, 
        telefono: data.telefono,
        direccion:data.direccion
    },(err,proveedor_edit)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(proveedor_edit){
                res.status(200).send({
                    msg:'Proveedor!',
                    proveedor:proveedor_edit
                });
            }else{
                res.status(403).send({
                    msg:'No existe el proveedor!'
                });
            }
        }
    });
    
}

function eliminar(req,res){
    let id = req.params['id'];

    Proveedor.findByIdAndRemove({_id:id},(err,proveedor_delete)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(proveedor_delete){
                res.status(200).send({
                    msg:'Proveedor eliminado!'
                });
            }else{
                res.status(403).send({
                    msg:'No existen registros!'
                });
            }
        }
    });
}

function get_proveedor(req,res){
    var id=req.params['id'];

    Proveedor.findById(id,(err,proveedor_data)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(proveedor_data){
                res.status(200).send({
                    proveedor:proveedor_data
                })
            }else{
                res.status(403).send({
                    msg:'No existen registros!'
                });
            }
        }
    });
}

module.exports ={
    registrar,
    listar,
    editar,
    eliminar,
    get_proveedor
}