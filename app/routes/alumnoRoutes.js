'use strict'
const express = require('express');
const alumnoController = require('../Controllers/alumnoController'); 

const apiRoutes = express.Router();

apiRoutes
.get('/alumnos', async (req, res) => await 
alumnoController.findAll(req, res))
.post('/insertAlumno', alumnoController.insertAlumno)
.put('/updateAlumno', alumnoController.updateAlumno)
.delete('/deleteAlumno/:id', alumnoController.deleteAlumno);

module.exports = apiRoutes;