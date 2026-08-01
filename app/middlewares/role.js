'use strict';

function isAdmin(req, res, next) {

    if (!req.user) {

        return res.status(401).send({
            message: "Usuario no autenticado"
        });

    }

    if (req.user.rolId !== 1) {

        return res.status(403).send({
            message: "Acceso denegado"
        });

    }

    next();

}

module.exports = {
    isAdmin
};