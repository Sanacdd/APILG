'use strict'

const db = require('../config/db');
const Maestro = db.maestro;

async function findAll(req, res) {
    Maestro.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertMaestro(request, response) {
    const maestroInsert = request.body;

    Maestro.create({
        ID_Grado:  maestroInsert.ID_Grado  || null,  // INT, nullable
        Nombre:    maestroInsert.Nombre,              // VARCHAR(50), NOT NULL
        Apellido:  maestroInsert.Apellido,            // VARCHAR(50), NOT NULL
        Telefono:  maestroInsert.Telefono  || null,  // VARCHAR(15), nullable
        Correo:    maestroInsert.Correo    || null,  // VARCHAR(100), nullable
    })
    .then(data => {
        response.status(201).send(data);
    })
    .catch(error => {
        response.status(400).send({ message: error.message || "Error al insertar el maestro" });
    });
}

async function updateMaestro(request, response) {
    const maestroUpdate = request.body;

    Maestro.update({
        ID_Grado:  maestroUpdate.ID_Grado  || null,
        Nombre:    maestroUpdate.Nombre,
        Apellido:  maestroUpdate.Apellido,
        Telefono:  maestroUpdate.Telefono  || null,
        Correo:    maestroUpdate.Correo    || null,
    }, {
        where: { ID_Maestro: maestroUpdate.ID_Maestro }  // busca por PK
    })
    .then(num => {
        if (num == 1) {
            response.status(200).send({ message: "Maestro actualizado correctamente" });
        } else {
            response.status(404).send({ message: "No se encontró el maestro" });
        }
    })
    .catch(error => {
        response.status(500).send({ message: error.message || "Error al actualizar el maestro" });
    });
}

module.exports = {
    findAll,
    insertMaestro,
    updateMaestro
}