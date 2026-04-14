'use strict'
const express = require('express');
const archivoController = require('../Controllers/archivoController');

const apiRoutes = express.Router();

apiRoutes
  .get('/archivos', async (req, res) => await archivoController.findAll(req, res))
  .post('/insertArchivo', archivoController.insertArchivo)
  .put('/updateArchivo', archivoController.updateArchivo)
  .delete('/deleteArchivo/:id', archivoController.deleteArchivo);

module.exports = apiRoutes;