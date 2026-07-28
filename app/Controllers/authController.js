'use strict';

const bcrypt = require('bcrypt');
const db = require('../config/db');
const tokenService = require('../services/tokenService');
console.log(tokenService);
async function login(req, res) {
    try {

        const { Correo, Password } = req.body;

        const usuario = await db.usuario.findOne({
            where: {
                Correo: Correo
            }
        });

        if (!usuario) {
            return res.status(404).send({
                message: 'Usuario no encontrado'
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            Password,
            usuario.Password
        );

        if (!passwordCorrecta) {
            return res.status(401).send({
                message: 'Contraseña incorrecta'
            });
        }

        return res.status(200).send({
            token: tokenService.createToken(usuario)
        });

    } catch (error) {

        return res.status(500).send({
            message: error.message
        });

    }
}

async function register(req, res) {
    try {

        const { Correo, Password, Rol } = req.body;

        const passwordHash = await bcrypt.hash(Password, 10);

        const usuario = await db.usuario.create({
            Correo,
            Password: passwordHash,
            Rol
        });

        return res.status(201).send({
            message: 'Usuario registrado correctamente',
            usuario
        });

    } catch (error) {

        return res.status(500).send({
            message: error.message
        });

    }
}

module.exports = {
    login,
    register
};