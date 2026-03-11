'use strict'
const express = require('express');
const gradoController = require('../Controllers/gradoControllers');

const apiRoutes = express.Router();

apiRoutes
.get('/grados', gradoController.findAll)
.get('/getGrados', async (req, res) => await gradoController.findAll(req, res));

module.exports = apiRoutes;