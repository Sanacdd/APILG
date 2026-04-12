'use strict'
const express = require('express');
const pagosController = require('../Controllers/pagosController');

const apiRoutes = express.Router();

apiRoutes
  .get('/pagos', async (req, res) => await pagosController.findAll(req, res))
  .get('/pagos/:ID_Pagos', pagosController.findOne)
  .post('/insertPago', pagosController.insertPago)
  .put('/updatePago', pagosController.updatePago)
  .delete('/deletePago/:ID_Pagos', pagosController.deletePago);
  

module.exports = apiRoutes;