'use strict'

const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({ origin: '*' })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Alumno
const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/api', alumnoRoutes);

// Clase
const claseRoutes = require('./routes/claseRoutes');
app.use('/api', claseRoutes);

// Grado
const gradoRoutes = require('./routes/gradoRoutes');
app.use('/api', gradoRoutes);

// Calificación
const calificacionRoutes = require('./routes/calificacionRoutes');
app.use('/api', calificacionRoutes);

module.exports = app;