'use strict';

const express = require('express');
const userController = require('../Controllers/userController');
// const authMiddleware = require('../middlewares/auth'); // Déjalo comentado si aún no lo usas

const router = express.Router();

router.post('/signUp', async (req, res) => {
    await userController.singUp(req, res);
});

module.exports = router;