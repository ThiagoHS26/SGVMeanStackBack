var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({

    //atributos
    nombres: String,
    usuario: String,
    email: String,
    password: String,
    role:String,
    createAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('user',UserSchema);