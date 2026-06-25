'use strict'
const express = require('express');
const alumnoController = require('../Controllers/alumnoController'); 

const apiRoutes = express.Router();

apiRoutes
.get('/alumnos', alumnoController.findAll)
.get('/getAlumnos', async (req, res) => await 
alumnoController.findAll(req, res));

module.exports = apiRoutes;