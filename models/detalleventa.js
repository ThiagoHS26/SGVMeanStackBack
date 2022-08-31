var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({

    //atributos
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
    venta: {type:Schema.ObjectId, ref:'venta'}

});

module.exports = mongoose.model('detalleventa',DetalleVentaSchema);