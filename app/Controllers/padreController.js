'use strict'

const db = require('../config/db');
const Padre = db.padre;

async function findAll(req, res){
    Padre.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertPadre(request, response){
    const padreInsert = request.body;

    Padre.create({
        nombre: padreInsert.nombre,
        apellido: padreInsert.apellido,
        
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

module.exports = {
    findAll,
    insertPadre
}