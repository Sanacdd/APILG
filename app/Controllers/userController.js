'use strict';

const db = require('../config/db');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const tokenService = require('../Service/Token');

const User = db.user;

async function singUp(req, res) {

    try {

        const password = await bcrypt.hash(req.body.pass, 10);

        const nuevoUsuario = await User.create({

            userId: req.body.Id,
            pass: password,
            rolId: req.body.rolId,
            passwordResetRequired: req.body.passwordResetRequired

        });

        return res.status(201).send({
            message: "Usuario creado correctamente",
            data: nuevoUsuario
        });

    } catch (error) {

        return res.status(500).send({
            message: error.message
        });

    }

}

async function singIn(req, res) {

    try {

        const userId = req.body.Id;
        const password = req.body.pass;

        const usuario = await User.findOne({

            where: {
                userId: {
                    [Op.eq]: userId
                }
            }

        });

        if (!usuario) {

            return res.status(404).send({
                message: "Usuario no encontrado"
            });

        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.pass
        );
if (!passwordCorrecta) {

    return res.status(401).send({
        message: "Contraseña incorrecta"
    });

}

console.log("LOGIN CORRECTO");
console.log({
    userId: usuario.userId,
    rolId: usuario.rolId,
    token: tokenService.createToken(
        usuario.userId,
        usuario.rolId
    )
});

return res.status(200).send({

    message: "Logged In",

    userId: usuario.userId,

    rolId: usuario.rolId,

    token: tokenService.createToken(
        usuario.userId,
        usuario.rolId
    ),

    passwordResetRequired:
        usuario.passwordResetRequired

});

    } catch (error) {

        return res.status(500).send({
            message: error.message
        });

    }

}

module.exports = {

    singUp,
    singIn

};