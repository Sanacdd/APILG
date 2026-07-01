'use strict'

const express = require('express');
const gradoClaseController = require('../Controllers/gradoClaseController');

const apiRoutes = express.Router();

apiRoutes
    .post('/grado-clase/asignar', gradoClaseController.asignarClases)
    .get('/grado-clase/:id', gradoClaseController.obtenerClasesPorGrado);

module.exports = apiRoutes;