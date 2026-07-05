'use strict'

const express = require('express');
const cors = require('cors');
const app = express();

console.log("APP.JS SE CARGÓ");

app.use(
    cors({ origin: '*' })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Tabla alumno Ruta
const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/api', alumnoRoutes);

// Tabla clase ruta
const claseRoutes = require('./routes/claseRoutes');
app.use('/api', claseRoutes);

// Tabla grado ruta
const gradoRoutes = require('./routes/gradoRoutes');
app.use('/api', gradoRoutes);

// Tabla maestro ruta
const maestroRoutes = require('./routes/maestroRoutes');
app.use('/api', maestroRoutes);

// Tabla padre ruta
const padreRoutes = require('./routes/padreRoutes');
app.use('/api', padreRoutes);

// Tabla pagos ruta
const pagosRoutes = require('./routes/pagosRoutes');
app.use('/api', pagosRoutes);

// Tabla archivo ruta
const archivoRoutes = require('./routes/archivoRoutes');
app.use('/api', archivoRoutes);

// Login
console.log("ANTES DE IMPORTAR AUTH");
const authRoutes = require('./routes/authRoutes');
console.log("AUTH IMPORTADAS");

app.use('/api', authRoutes);
console.log("AUTH REGISTRADAS");

module.exports = app;