'use strict';

const db = require('../config/db');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const tokenService = require('../Service/Token');

const User = db.user;
const Maestro = db.maestro;
const Padre = db.padre;

async function listarUsuarios(req, res) {
  try {
    const usuarios = await User.findAll({
      attributes: [
        'userId',
        'rolId',
        'passwordResetRequired',
      ],
      order: [['userId', 'ASC']],
    });

    return res.status(200).send(usuarios);
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Error al listar los usuarios',
    });
  }
}

async function singUp(req, res) {
  try {
    const {
      Id,
      pass,
      rolId,
      passwordResetRequired = true,
    } = req.body;

    if (!Id || !pass || !rolId) {
      return res.status(400).send({
        message: 'Identidad, contraseña y rol son obligatorios',
      });
    }

    const rolNumero = Number(rolId);

    if (![1, 2, 3].includes(rolNumero)) {
      return res.status(400).send({
        message: 'El rol seleccionado no es válido',
      });
    }

    const usuarioExistente = await User.findByPk(Id);

    if (usuarioExistente) {
      return res.status(409).send({
        message: 'Ya existe un usuario con esa identidad',
      });
    }

    if (rolNumero === 2) {
      const maestro = await Maestro.findByPk(Id);

      if (!maestro) {
        return res.status(400).send({
          message:
            'La identidad no corresponde a un maestro registrado',
        });
      }
    }

    if (rolNumero === 3) {
      const padre = await Padre.findByPk(Id);

      if (!padre) {
        return res.status(400).send({
          message:
            'La identidad no corresponde a un padre registrado',
        });
      }
    }

    const passwordHash = await bcrypt.hash(pass, 10);

    const nuevoUsuario = await User.create({
      userId: Id,
      pass: passwordHash,
      rolId: rolNumero,
      passwordResetRequired: Boolean(
        passwordResetRequired
      ),
    });

    return res.status(201).send({
      message: 'Usuario creado correctamente',
      data: {
        userId: nuevoUsuario.userId,
        rolId: nuevoUsuario.rolId,
        passwordResetRequired:
          nuevoUsuario.passwordResetRequired,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Error al crear el usuario',
    });
  }
}

async function cambiarPassword(req, res) {
  try {
    const { userId } = req.params;
    const { pass } = req.body;

    if (!pass) {
      return res.status(400).send({
        message: 'La nueva contraseña es obligatoria',
      });
    }

    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).send({
        message: 'Usuario no encontrado',
      });
    }

    const passwordHash = await bcrypt.hash(pass, 10);

    await usuario.update({
      pass: passwordHash,
      passwordResetRequired: true,
    });

    return res.status(200).send({
      message: 'Contraseña actualizada correctamente',
    });
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        'Error al actualizar la contraseña',
    });
  }
}

async function cambiarRol(req, res) {
  try {
    const { userId } = req.params;
    const { rolId } = req.body;

    const rolNumero = Number(rolId);

    if (![1, 2, 3].includes(rolNumero)) {
      return res.status(400).send({
        message: 'El rol seleccionado no es válido',
      });
    }

    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).send({
        message: 'Usuario no encontrado',
      });
    }

    if (rolNumero === 2) {
      const maestro = await Maestro.findByPk(userId);

      if (!maestro) {
        return res.status(400).send({
          message:
            'La identidad no corresponde a un maestro registrado',
        });
      }
    }

    if (rolNumero === 3) {
      const padre = await Padre.findByPk(userId);

      if (!padre) {
        return res.status(400).send({
          message:
            'La identidad no corresponde a un padre registrado',
        });
      }
    }

    await usuario.update({
      rolId: rolNumero,
    });

    return res.status(200).send({
      message: 'Rol actualizado correctamente',
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Error al actualizar el rol',
    });
  }
}

async function singIn(req, res) {
  try {
    const userId = req.body.Id;
    const password = req.body.pass;

    if (!userId || !password) {
      return res.status(400).send({
        message: 'Usuario y contraseña son obligatorios',
      });
    }

    const usuario = await User.scope('withPassword').findOne({
      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
    });

    if (!usuario) {
      return res.status(404).send({
        message: 'Usuario no encontrado',
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.pass
    );

    if (!passwordCorrecta) {
      return res.status(401).send({
        message: 'Contraseña incorrecta',
      });
    }

    return res.status(200).send({
      message: 'Logged In',
      userId: usuario.userId,
      rolId: usuario.rolId,
      token: tokenService.createToken(
        usuario.userId,
        usuario.rolId
      ),
      passwordResetRequired:
        usuario.passwordResetRequired,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  listarUsuarios,
  singUp,
  singIn,
  cambiarPassword,
  cambiarRol,
};