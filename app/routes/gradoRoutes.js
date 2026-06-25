'use strict'
const express = require('express');
const gradoController = require('../Controllers/gradoControllers'); 

const apiRoutes = express.Router();


apiRoutes
    .get('/grados', gradoController.findAll)
    .post('/grados', gradoController.insertGrado)
    .put('/grados', gradoController.updateGrado)
    .delete('/grados/:id', gradoController.deleteGrado);

module.exports = apiRoutes;