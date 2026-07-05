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
//Tabla grado ruta
const gradoRoutes = require('./routes/gradoRoutes');
app.use('/api', gradoRoutes);
//Tabla maestro ruta
const maestroRoutes = require('./routes/maestroRoutes');
app.use('/api', maestroRoutes);
//Tabla padre ruta
const padreRoutes = require('./routes/padreRoutes');
app.use('/api', padreRoutes);
//Tabla pagos ruta
const pagosRoutes = require('./routes/pagosRoutes');
app.use('/api', pagosRoutes);
//Tabla estado de cuenta ruta
const estadoCuentaRoutes = require('./routes/estadoCuentaRoutes');
app.use('/api', estadoCuentaRoutes);

module.exports = app;