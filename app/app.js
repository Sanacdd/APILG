'use strict'

const express = require('express');
const cors = require('cors');

const app = express();

console.log("APP.JS SE CARGÓ");

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ======================
// RUTAS
// ======================

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

// Maestro
const maestroRoutes = require('./routes/maestroRoutes');
app.use('/api', maestroRoutes);

// Padre
const padreRoutes = require('./routes/padreRoutes');
app.use('/api', padreRoutes);

// Pagos
const pagosRoutes = require('./routes/pagosRoutes');
app.use('/api', pagosRoutes);

// Archivo
const archivoRoutes = require('./routes/archivoRoutes');
app.use('/api', archivoRoutes);

//Tabla estado de cuenta ruta
const estadoCuentaRoutes = require('./routes/estadoCuentaRoutes');
app.use('/api', estadoCuentaRoutes);
// Tabla grado_clase ruta
const gradoClaseRoutes = require('./routes/gradoClaseRoutes');
app.use('/api', gradoClaseRoutes);
// Tabla maestro_grado ruta
const maestroGradoRoutes = require('./routes/maestroGradoRoutes');
app.use('/api', maestroGradoRoutes);
// Tabla user ruta
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);
// Login
console.log("ANTES DE IMPORTAR AUTH");
const authRoutes = require('./routes/authRoutes');
console.log("AUTH IMPORTADAS");

app.use('/api', authRoutes);
console.log("AUTH REGISTRADAS");

module.exports = app;