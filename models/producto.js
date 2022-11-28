var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({

    //atributos
    codigo: String,
    titulo: String,
    marca: String,
    descripcion: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    puntos: Number,
    idcategoria: {type: Schema.ObjectId, ref: 'categoria'},
    createAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('producto',ProductoSchema);