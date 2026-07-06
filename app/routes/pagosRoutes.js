'use strict'
const express = require('express');//Se importa el módulo express para crear las rutas de la API.
const pagosController = require('../Controllers/pagosController');//Aquí se definen las rutas para los pagos, utilizando el controlador correspondiente para cada operación.

const apiRoutes = express.Router();//Se crea un enrutador de Express para manejar las rutas relacionadas con los pagos.

apiRoutes
.get('/pagos', async (req, res) => await
pagosController.findAll(req, res))
.post('/insertPago', pagosController.insertPago)
.put('/updatePago', pagosController.updatePago)
.delete('/deletePago/:id', pagosController.deletePago);

module.exports = apiRoutes;//Exporta las rutas de pagos para que otros archivos las puedan usar