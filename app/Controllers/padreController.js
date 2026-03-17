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

async function updatePadre(request, response){
    const padreUpdate = request.body;

    Padre.update(padreUpdate, {
        where: { id: padreUpdate.id }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Padre actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el padre"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el padre"
        });
    });
}

module.exports = {
    findAll,
    insertPadre,
    updatePadre
}