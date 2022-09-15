var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//Routes
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var venta_routes = require('./routes/venta');
var proveedor_routes = require('./routes/proveedor');
var compra_routes = require('./routes/compra');

var app = express();

mongoose.connect('mongodb://localhost:27017/heredia_storeDB',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("Servidor corriendo");
        app.listen(port, function(){
            console.log("Servidor conectado en "+port);
        });
    }
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',user_routes);
app.use('/api',categoria_routes);
app.use('/api',producto_routes);
app.use('/api',cliente_routes);
app.use('/api',venta_routes);
app.use('/api',proveedor_routes);
app.use('/api',compra_routes);

//exportar modulo
module.exports = app;