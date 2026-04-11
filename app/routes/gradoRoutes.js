'use strict'
const express = require('express');
const gradoController = require('../Controllers/gradoControllers');

const apiRoutes = express.Router();

apiRoutes
.get('/grados', async (req, res) => await gradoController.findAll(req, res))
.post('/insertGrado', gradoController.insertGrado)
.put('/updateGrado', gradoController.updateGrado)
.delete('/grado/:id', gradoController.deleteGrado)

module.exports = apiRoutes;