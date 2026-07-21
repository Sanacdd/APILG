'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

function createToken(user) {

    const payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix(),
    };

    return jwt.encode(payload, process.env.SECRET_TOKEN);

}

function decodeToken(token) {

    return new Promise((resolve, reject) => {

        try {

            const payload = jwt.decode(token, process.env.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {

                return reject({
                    status: 401,
                    message: 'Token expirado'
                });

            }

            resolve(payload.sub);

        } catch (error) {

            reject({
                status: 500,
                message: 'Token inválido'
            });

        }

    });

}

module.exports = {
    createToken,
    decodeToken
};