'use strict'
const express = require('express');
const claseController = require('../Controllers/claseController');

const apiRouter = express.Router();

apiRouter.get('/clases', claseController.findAll);
apiRouter.get('/getClases', async (req, res) => await claseController.findAll(req, res));

module.exports = apiRouter;