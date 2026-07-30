'use strict';

const service = require('../Service/Token');

function isAuth(req, res, next) {

    console.log("HEADERS:");
    console.log(req.headers);

    if (!req.headers.authorization) {
        console.log("NO LLEGÓ AUTHORIZATION");
        return res.status(403).send({
            message: "No tienes autorización"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    console.log("TOKEN:");
    console.log(token);

    service.decodeToken(token)
        .then(data => {
            console.log("TOKEN VÁLIDO");
            req.user = data;
            next();
        })
        .catch(err => {
            console.log("TOKEN INVÁLIDO");
            console.log(err);

            return res.status(500).send({
                message: err.message
            });
        });

}

module.exports = isAuth;