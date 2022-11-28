var Cliente = require('../models/cliente');

function registrar(req,res) {
    var data = req.body;

    Cliente.findOne({ci:data.ci},(err,cedula_valid)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else{
            if(cedula_valid){
                res.status(400).send({
                    msg:'El cliente ya está registrado!'
                });
            }else{
                let cliente = new Cliente();
                cliente.nombres = data.nombres;
                cliente.correo = data.correo;
                cliente.ci = data.ci;
                cliente.ruc = data.ci+"001";
                cliente.direccion = data.direccion;
                cliente.puntos = 0;
                cliente.save((err,cliente_save)=>{
                    if(err){
                        res.status(500).send({
                            msg:'Error en el servidor!'
                        })
                    }else{
                        if(cliente_save){
                            res.status(200).send({
                                msg:'Cliente agregado correctamente!',
                                cliente:cliente_save
                            });
                        }else{
                            res.status(403).send({
                                msg:'No se pudo agregar el cliente!'
                            });
                        }
                    }
                });
            }
        }
    });
    
}

function editar(req, res) {  
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate({_id:id},{
        //ci:data.ci,
        //ruc:ci+"001",
        nombres: data.nombres,
        correo: data.correo,
        direccion: data.direccion
    },(err,cliente_edit)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            })
        }else{
            if(cliente_edit){
                res.status(200).send({
                    msg:'Cliente actualizado correctamente!',
                    cliente:cliente_edit
                })
            }else{
                res.status(403).send({
                    msg:'No se pudo actualizar el cliente!'
                });
            }
        }
    });
    
}

function eliminar(req,res){
    let id = req.params['id'];

    Cliente.findByIdAndRemove({_id:id},(err,cliente_delete)=>{
        if(err){
            res.status(500).send({
                msg:'No se encontró el cliente!'
            })
        }else{
            if(cliente_delete){
                res.status(200).send({
                    msg:'Cliente eliminado correctamente!'
                })
            }else{
                res.status(403).send({
                    msg:'No se pudo eliminar el cliente!'
                });
            }
        }
    });
}

function listar(req,res) {  
    Cliente.find((err,cliente_data)=>{
        if(err){
            res.status(500).send({
                msg:'No existen registros de clientes!'
            })
        }else{
            if(cliente_data){
                res.status(200).send({
                    clientes:cliente_data
                })
            }else{
                res.status(403).send({
                    msg:'No existen registros de clientes!'
                })
            }
        }
    });
}

function get_cliente(req,res){
    var id = req.params['id'];
    Cliente.findById({_id:id},(err,cliente_data)=>{
        if(err){
            res.status(500).send({
                msg:'No se encontró el cliente!'
            })
        }else{
            if(cliente_data){
                res.status(200).send({
                    msg:'Cliente!',
                    cliente:cliente_data
                })
            }else{
                res.status(403).send({
                    msg:'No existe se encontró cliente!'
                })
            }
        }
    })
}

module.exports ={
    registrar,
    editar,
    eliminar,
    listar,
    get_cliente
}