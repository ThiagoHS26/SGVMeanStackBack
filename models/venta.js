var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({

    //atributos
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    total: Number,
    fecha: {type: Date, default: Date.now},
});

module.exports = mongoose.model('venta',VentaSchema);