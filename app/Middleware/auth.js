'use strict'

const service = require('../Services/authService')

function isAuth(req, res, next) {
    if (!req.headers.authorization) return res.status(403).
    send({ message: "No tienes autorización" })
     
    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
    .then(data => {
        req.user = data;
        next();
    })
    .catch(err => {
        return res.status(500).send({ message: err.message });
    });

}

module.exports = { isAuth };