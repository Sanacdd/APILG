'use strict'
const express = require('express');
const archivoController = require('../Controllers/archivoController');

const apiRoutes = express.Router();

apiRoutes
  .get('/archivos', async (req, res) => await archivoController.findAll(req, res))
  .post('/archivos', archivoController.insertArchivo)
  .put('/updateArchivo', archivoController.updateArchivo)
  .get('/alumno/:dni/constancia', archivoController.generarConstanciaMatricula)
  .get('/alumno/:dni/certificacion', archivoController.generarCertificacionEstudios);

module.exports = apiRoutes;