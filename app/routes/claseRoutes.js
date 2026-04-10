'use strict'
const express = require('express');
const claseController = require('../Controllers/claseController'); 
const apiRoutes = express.Router();

apiRoutes
.get('/clases', async (req, res) => await 
claseController.findAll(req, res))
.post('/insertClase', claseController.insertClase)
.put('/updateClase', claseController.updateClase);
module.exports = apiRoutes;