'use strict';

function isAdmin(req, res, next) {

    if (!req.usuario) {
        return res.status(401).send({
            message: 'Usuario no autenticado'
        });
    }

    if (req.usuario.Rol !== 'Administrador') {
        return res.status(403).send({
            message: 'Acceso denegado'
        });
    }

    next();
}

module.exports = {
    isAdmin
};