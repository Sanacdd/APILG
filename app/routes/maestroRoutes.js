'use strict'
const express = require('express');
const maestroController = require('../Controllers/maestroController'); 

const apiRoutes = express.Router();

apiRoutes
.get('/maestros', maestroController.findAll)
.get('/getMaestros', async (req, res) => await 
maestroController.findAll(req, res))
.post('/insertMaestro', maestroController.insertMaestro)
.put('/updateMaestro', maestroController.updateMaestro);

module.exports = apiRoutes;