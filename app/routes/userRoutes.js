'use strict';

const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/signUp', async (req, res) => {
    await userController.singUp(req, res);
});

router.post('/signIn', async (req, res) => {
    await userController.singIn(req, res);
});

module.exports = router;