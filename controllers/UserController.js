var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../helpers/jwt');
var nodemailer = require('nodemailer');

function registrar(req,res){
    var params = req.body;
    
    User.findOne({email:params.email},{usuario:params.usuario},(err,email_valid)=>{
        if(err){
            res.status(500).json({
                msg:'Error en el servidor!'
            });
        }else{
            if(email_valid){
                res.status(400).json({
                    msg:'El correo ya está registrado!'
                });
            }else{
                if(params.password){
                    bcrypt.hash(params.password,null,null,function(err,hash){
                        if(err){
                            res.status(500).json({
                                msg:'Error en el servidor!'
                            });
                        }else{
                            if(hash){
                                let user = new  User();
                                user.password = hash;
                                user.nombres = params.nombres;
                                user.usuario = params.usuario;
                                user.email = params.email;
                                user.role = params.role;
                                user.save((err,user_save)=>{
                                    if(err){
                                        res.status(400).json({msg: 'No se agregó el usuario!'});
                                    }else{
                                        res.status(200).send({
                                            user:user_save
                                        });
                                    }
                                });
                            }
                        }
                    });
                }else{
                    res.status(400).json({
                        msg:'Ingresa la contraseña!',
                    });
                }
            }
        }
        
    });
}

function login(req,res){
    var data = req.body;

    User.findOne({email:data.email},(err,user_data)=>{
        if(err){
            res.status(500).json({
                msg:'Error en el servidor!'
            });
        }else{
            if(user_data){
                bcrypt.compare(data.password, user_data.password,function(err,check){
                    if(check){
                        if(data.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            })
                        }else{
                            res.status(200).send({
                                user: user_data,
                                jwt: jwt.createToken(user_data)
                            })
                        }
                    }else{
                        res.status(400).json({
                            msg:'Ingrese correctamente la contraseña!'
                        });
                    }
                });
            }else{
                res.status(403).json({
                    msg:'El correo no está registrado!'
                });
            }
        }
    });
}

function listar(req,res){
    User.find((err,users_data)=>{
        if(err){
            res.status(500).send({
                msg:'Error en el servidor!'
            });
        }else if(!users_data){
            res.status(400).json({
                msg:'No se encontraron registros!'
            });
        }else{
            res.status(200).send({
                msg:'Lista de usuarios!',
                usuarios:users_data 
            });
        }
        
    });
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body;

    if(data.password){
        bcrypt.hash(data.password,null,null,function(err,hash){
            if(err){
                res.status(500).json({
                    msg:'Error en el servidor!'
                });
            }else{
                if(hash){
                    User.findByIdAndUpdate(id,{
                        nombres:data.nombres,
                        usuario:data.usuario,
                        email:data.email,
                        password:hash,
                        role:data.role
                    },(err,user_edit)=>{
                        if(user_edit){
                            res.status(200).send({
                                user:user_edit
                            });
                        }else{
                            res.status(400).json({
                                msg:'No se pudo editar el usuario!'
                            });
                        }
                    });
                }
            }
        });
    }else{
        User.findByIdAndUpdate({_id:id},{
            nombres:data.nombres,
            email:data.email,
            usuario:data.usuario,
            role:data.role
        },(err,user_edit)=>{
            if(err){
                res.status(500).json({
                    msg:'Error en el servidor!'
                });
            }
            if(user_edit){
                res.status(200).send({
                    msg:'Ususario editado!',
                    user:user_edit
                });
            }else{
                res.status(500).json({
                    msg:'El usuario no pudo ser editado'
                });
            }
        });
    }
}

function get_user(req,res){
    var id = req.params['id'];
    User.findById({_id:id},(err,user_data)=>{
        if(err){
            res.status(500).json({
                msg:'Error en el servidor!'
            });
        }else if(!user_data){
            res.status(400).json({
                msg:'El usuario no está registrado!'
            });
        }else{
            res.status(200).send({
                mgs:'Usuario encontrado!',
                user:user_data
            });
        }
        
    });
}

function eliminar(req,res){
    var id = req.params['id'];
    User.findByIdAndDelete({_id:id},(err,user_delete)=>{
        if(err){
            res.status(500).json({
                msg:'Error en el servidor!'
            });
        }else if(!user_delete){
            res.status(400).json({
                msg:'El usuario no está registrado!',
            });
        }else{
            res.status(200).send({
                msg:'Usuario eliminado!'
            });
        }
    });
}

module.exports = {
    registrar,
    login,
    listar,
    editar,
    get_user,
    eliminar
}