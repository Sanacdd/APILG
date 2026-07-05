'use strict';

const express = require('express');
const isAuth = require('../middlewares/auth');
const role = require('../middlewares/role');
const alumnoController = require('../Controllers/alumnoController');

const apiRoutes = express.Router();

apiRoutes.get(
    '/alumnos',
    isAuth,
    alumnoController.findAll
);

apiRoutes.post(
    '/insertAlumno',
    isAuth,
    role.isAdmin,
    alumnoController.insertAlumno
);

apiRoutes.put(
    '/updateAlumno',
    isAuth,
    role.isAdmin,
    alumnoController.updateAlumno
);

apiRoutes.delete(
    '/deleteAlumno/:id',
    isAuth,
    role.isAdmin,
    alumnoController.deleteAlumno
);

module.exports = apiRoutes;