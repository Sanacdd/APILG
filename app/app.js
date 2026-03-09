'use strict'

const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({origin: '*'})
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Tabla alumno Ruta
const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/api', alumnoRoutes);
//Tabla clase ruta
const claseRoutes = require('./routes/claseRoutes'); 
app.use('/api', claseRoutes); 

module.exports = app;