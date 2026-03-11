'use strict'

const db = require('../config/db');
const Grado = db.grado;

async function findAll(req, res) {
    Grado.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

module.exports = {
    findAll
}