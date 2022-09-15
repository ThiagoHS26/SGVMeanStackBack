var Proveedor = require('../models/proveedor');

function registrar(req,res) {
    let data = req.body;
    var proveedor = new Proveedor();
    proveedor.nombres = data.nombres;
    proveedor.ci = data.ci;
    proveedor.correo = data.correo;
    proveedor.empresa = data.empresa;
    proveedor.telefono = data.telefono;

    proveedor.save((err,proveedor_save)=>{
        if(proveedor_save){
            res.status(200).send({
                proveedor:proveedor_save
            });
        }else{
            res.status(500).send({err});
        }
    });

}

function listar(req,res){
    Proveedor.find((err,proveedor_data)=>{
        if(proveedor_data){
            res.status(200).send({
                proveedores:proveedor_data,
            });
        }else{
            res.status(500).send({err});
        }
    })
}

function editar(req, res) {  
    let id = req.params['id'];
    let data = req.body;

    Proveedor.findByIdAndUpdate(id,{nombres: data.nombres,ci: data.ci, correo: data.correo,
    empresa:data.empresa, telefono: data.telefono},(err,proveedor_edit)=>{
        if(proveedor_edit){
            res.status(200).send({
                proveedor:proveedor_edit
            });
        }else{
            res.status(500).send({
                msg:'No se encontró ningún registro'
            });
        }
    });
}

function eliminar(req,res){
    let id = req.params['id'];

    Proveedor.findByIdAndRemove(id,(err,proveedor_delete)=>{
        if(proveedor_delete){
            res.status(200).send({
                proveedor:proveedor_delete
            });
        }else{
            res.status(500).send({err});
        }
    });
}

function get_proveedor(req,res){
    var id=req.params['id'];

    Proveedor.findById(id,(err,proveedor_data)=>{
        if(proveedor_data){
            res.status(200).send({
                proveedor:proveedor_data
            })
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