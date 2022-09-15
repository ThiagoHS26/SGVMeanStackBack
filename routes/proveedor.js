var express = require('express');
const { model } = require('mongoose');
var proveedorController = require('../controllers/ProveedorController');

var api = express.Router();

api.post('/proveedor/registrar',proveedorController.registrar);
api.get('/proveedores',proveedorController.listar);//get all
api.put('/proveedor/editar/:id',proveedorController.editar);
api.delete('/proveedor/eliminar/:id',proveedorController.eliminar);
api.get('/proveedor/:id',proveedorController.get_proveedor);//get by id

module.exports = api;