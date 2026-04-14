'use strict'
const express = require('express');//Se importa el módulo express para crear las rutas de la API.
const pagosController = require('../Controllers/pagosController');//Aquí se definen las rutas para los pagos, utilizando el controlador correspondiente para cada operación.

const apiRoutes = express.Router();//Se crea un enrutador de Express para manejar las rutas relacionadas con los pagos.

apiRoutes
  .get('/pagos', async (req, res) => await pagosController.findAll(req, res)) //este endponint permite consultar todos los pagos registrados en la base de datos.
  .get('/pagos/:ID_Pagos', pagosController.findOne)//este endpoint permite consultar un pago específico utilizando su ID_Pagos como parámetro.
  .post('/insertPago', pagosController.insertPago)//este endpoint permite registrar un nuevo pago en la BD
  .put('/updatePago', pagosController.updatePago)//este endpoint permite actualizar un pago existente, identificándolo por su ID_Pagos.
  .delete('/deletePago/:ID_Pagos', pagosController.deletePago);//este endpoint permite eliminar un pago
  

module.exports = apiRoutes;//Exporta las rutas de pagos para que otros archivos las puedan usar