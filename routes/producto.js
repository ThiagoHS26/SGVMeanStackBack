var express = require('express');
const { model } = require('mongoose');
var productoController = require('../controllers/ProductoController');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/producto/registrar',path,productoController.registrar);
api.get('/productos/:titulo?',productoController.listar);
api.put('/producto/editar/:id',path,productoController.editar);//parametro /:img
api.get('/producto/:id',path,productoController.obtener_producto);
api.delete('/producto/:id',productoController.eliminar);
api.put('/producto/stock/:id',productoController.update_stock);
api.get('/producto/img/:img',productoController.get_img);
module.exports = api;