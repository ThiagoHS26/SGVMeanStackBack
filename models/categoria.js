var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({

    //atributos
    titulo: String,
    codigo: String,
    descripcion: String,
    createAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('categoria',CategoriaSchema);