var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleCompraSchema = Schema({

    //atributos
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
    subtotal: Number,
    compra: {type:Schema.ObjectId, ref:'compra'},
    createAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('detallecompra',DetalleCompraSchema);