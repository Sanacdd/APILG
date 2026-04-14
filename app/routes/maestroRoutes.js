'use strict'
const express = require('express');
const maestroController = require('../Controllers/maestroControllers'); 

const apiRoutes = express.Router();

apiRoutes
.get('/maestros', async (req, res) => await maestroController.findAll(req, res))
.post('/insertMaestro', maestroController.insertMaestro)
.put('/updateMaestro', maestroController.updateMaestro)
.delete('/deleteMaestro/:id', maestroController.deleteMaestro); // 👈 ESTA FALTABA

module.exports = apiRoutes;