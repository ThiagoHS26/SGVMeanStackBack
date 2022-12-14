var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({

    //atributos
    nombres: String,
    ci: String,
    ruc: String,
    correo: String,
    direccion:String,
    puntos: Number,
    createAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('cliente',ClienteSchema);