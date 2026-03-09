'use strict'

const db = require('../config/db');
const Clase = db.clase;

async function findAll(req, res){
    Clase.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error =>{
            res.status(400).send(error);
        })
}

module.exports = {
    findAll
}