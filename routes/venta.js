var express = require('express');
const { model } = require('mongoose');
var ventaController = require('../controllers/VentaController');

var api = express.Router();

api.post('/venta/registrar',ventaController.registrar);//registro de ventas 
api.get('/venta/:id',ventaController.datos_venta);//listado particular de una venta
api.get('/ventas',ventaController.listado_venta);//listado general de todas las ventas
api.get('/venta/data/:id',ventaController.detalles_venta);
api.get('/ventas/reporte/:fecha',ventaController.reporte_ventas);

module.exports = api;