'use strict';

const express = require('express');
const isAuth = require('../middlewares/auth');
const role = require('../middlewares/role');
const alumnoController = require('../Controllers/alumnoController');

const apiRoutes = express.Router();

apiRoutes
    .get('/alumnos', isAuth, alumnoController.findAll)
    .get('/buscar', alumnoController.buscarAlumno)
    .post('/insertAlumno', isAuth, role.isAdmin, alumnoController.insertAlumno)
    .put('/updateAlumno', isAuth, role.isAdmin, alumnoController.updateAlumno)
    .delete('/deleteAlumno/:id', isAuth, role.isAdmin, alumnoController.deleteAlumno);

module.exports = apiRoutes;