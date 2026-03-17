'use strict'
const express = require('express');
const pagosController = require('../Controllers/pagosController');

const apiRoutes = express.Router();

apiRoutes
.get('/pagos', pagosController.findAll)
.get('/getPagos', async (req, res) => await
pagosController.findAll(req, res))
.post('/insertPago', pagosController.insertPago)
.put('/updatePago', pagosController.updatePago);

module.exports = apiRoutes;