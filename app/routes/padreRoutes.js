'use strict'
const express = require('express');
const padreController = require('../Controllers/padreController'); 

const apiRoutes = express.Router();

apiRoutes
.get('/padres', padreController.findAll)
.get('/getPadres', async (req, res) => await 
padreController.findAll(req, res));

module.exports = apiRoutes;