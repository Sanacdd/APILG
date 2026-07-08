'use strict'

const jwt = require('jwt-simple'); 
const moment = require ('moment'); 

function createToken(user){
    const payload = {
        sub: user,
        iat:moment().unix(),
        exp:moment().add(15, 'days').unix(),

    }

    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(toke){
    const decode = new Promise(function(resolve, reject){
        try{
            const payload = jwt.decode (createToken, process.env.SECRET_TOKEN);
            if (payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'token expired'
                });
            }
            resolve(payload.sub);
        } catch (error){

            reject({
                    status: 500,
                    message: 'invalid token'

            });
        }
    });
    return decode;
}