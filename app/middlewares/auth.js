'use strict';

const tokenService = require('../services/tokenService');

async function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'No se envió el token'
        });
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try {

        const usuario = await tokenService.decodeToken(token);

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(error.status || 500).send({
            message: error.message
        });

    }

}

module.exports = isAuth;