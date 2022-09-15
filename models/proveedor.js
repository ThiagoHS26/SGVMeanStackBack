var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({

    //atributos
    nombres: String,
    ci: String,
    correo: String,
    empresa: String,
    telefono:String,
    createAt: {type: Date, default:Date.now}

});

module.exports = mongoose.model('proveedor',ProveedorSchema);