'use strict'
const express = require('express');
const alumnoController = require('../Controllers/alumnoController'); 

const apiRouter = express.Router();

apiRouter.get('/alumnos', alumnoController.findAll);
apiRouter.get('/getAlumnos', async (req, res) => await 
alumnoController.findAll(req, res));

module.exports = apiRouter;