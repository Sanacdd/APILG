'use strict'
const express = require('express');
const padreController = require('../Controllers/padreController');
const apiRoutes = express.Router();

apiRoutes
  .get('/padres', async (req, res) => await padreController.findAll(req, res))
  .post('/insertPadre', padreController.insertPadre)
  .put('/updatePadre', padreController.updatePadre)
  .delete('/padres/id', padreController.deletePadre);

module.exports = apiRoutes;