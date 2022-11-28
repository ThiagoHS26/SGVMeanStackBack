var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompraSchema = Schema({

    //atributos
    idproveedor: {type: Schema.ObjectId, ref: 'proveedor'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    total: Number,
    tipo_documento:String,
    factura : String,
    fecha: {type: Date, default:Date.now}
});

module.exports = mongoose.model('compra',CompraSchema);