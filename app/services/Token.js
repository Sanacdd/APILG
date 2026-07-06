'use strict'

const jwt = require ('jwt-simple');
const moment = require ('moment');

function createToken (user){
    const payload = {
        sub: user,
        iat :moment().unix(),
        exp:moment().add(15,
            'days').unix(),
    }
}