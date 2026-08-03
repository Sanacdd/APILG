'use strict'

const express = require('express');
const maestroGradoController = require('../Controllers/maestroGradoController');

const apiRoutes = express.Router();

apiRoutes.post(
    '/maestro-grado/asignar',
    maestroGradoController.asignarMaestro
);

apiRoutes.get(
    '/maestro-grado/:dni/alumnos',
    maestroGradoController.obtenerAlumnosPorMaestro
);
module.exports = apiRoutes;