var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleCompraSchema = Schema({

    //atributos
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
    subtotal: Number,
    compra: {type:Schema.ObjectId, ref:'compra'}
    //agregar imagen de la factura (opcional)
});

module.exports = mongoose.model('detallecompra',DetalleCompraSchema);