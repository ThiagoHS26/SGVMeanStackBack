var express = require('express');
const { model } = require('mongoose');
var userController = require('../controllers/UserController');

var api = express.Router();

api.post('/registrar',userController.registrar);
api.post('/login',userController.login);
api.get('/usuarios',userController.listar);
api.put('/usuario/editar/:id',userController.editar);
api.get('/usuario/:id',userController.get_user);
api.delete('/usuario/eliminar/:id',userController.eliminar);
module.exports = api;