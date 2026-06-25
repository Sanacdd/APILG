'use strict'
const express = require('express');
const claseController = require('../Controllers/claseController');

const apiRoutes = express.Router();

apiRoutes
.get('/clases', claseController.findAll)
.get('/getClases', async (req, res) => await claseController.findAll(req, res));

module.exports = apiRoutes;