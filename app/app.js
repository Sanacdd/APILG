'use strict'

const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({origin: '*'})
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/api', alumnoRoutes);

module.exports = app;