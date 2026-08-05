'use strict';

const express = require('express');
const userController = require('../Controllers/userController');
const isAuth = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = express.Router();

/* Inicio de sesión */
router.post('/signIn', userController.singIn);

/* Gestión de usuarios: solo administrador */

router.get(
  '/usuarios',
  isAuth,
  role.isAdmin,
  userController.listarUsuarios
);

router.put(
  '/usuarios/:userId/password',
  isAuth,
  role.isAdmin,
  userController.cambiarPassword
);

module.exports = router;