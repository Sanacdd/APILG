'use strict';

const express = require('express');
const estadoCuentaController = require('../Controllers/estadoCuentaController');

const apiRoutes = express.Router();

apiRoutes.get(
    '/estado-cuenta/:dniPadre/:anio',
    estadoCuentaController.obtenerEstadoCuenta
);

module.exports = apiRoutes;