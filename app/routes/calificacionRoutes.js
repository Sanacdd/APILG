'use strict'

const express = require('express');
const calificacionController = require('../Controllers/calificacionController');

const apiRoutes = express.Router();

// Obtener todas las calificaciones
apiRoutes.get('/calificaciones', calificacionController.findAll);

// Registrar una calificación
apiRoutes.post('/calificaciones', calificacionController.insertCalificacion);

// Actualizar una calificación
apiRoutes.put('/calificaciones', calificacionController.updateCalificacion);

// Eliminar una calificación
apiRoutes.delete('/calificaciones/:id', calificacionController.deleteCalificacion);

module.exports = apiRoutes;