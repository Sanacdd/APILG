'use strict';

const express = require('express');
const authController = require('../Controllers/authController');

const apiRoutes = express.Router();

apiRoutes.post('/login', authController.login);
apiRoutes.post('/register', authController.register);
apiRoutes.get('/prueba', (req, res) => {
    res.send('FUNCIONA');
});

module.exports = apiRoutes;