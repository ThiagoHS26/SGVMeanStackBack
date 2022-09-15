var express = require('express');
const { model } = require('mongoose');
var compraController = require('../controllers/CompraController');

var api = express.Router();

api.post('/compra/registrar',compraController.registrar);//registro de compras 
api.get('/compra/:id',compraController.datos_compra);//listado de compras
api.get('/compras',compraController.listado_compra);//listado general de todas las compras
api.get('/compra/data/:id',compraController.detalles_compra);


module.exports = api;