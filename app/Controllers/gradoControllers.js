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

async function insertGrado(request, response) {
    const gradoInsert = request.body;

    Grado.create({
        ID_Clase:     gradoInsert.ID_Clase    || null,  // INT, nullable
        Nombre_Grado: gradoInsert.Nombre_Grado,         // VARCHAR(50), NOT NULL
        Seccion:      gradoInsert.Seccion     || null,  // VARCHAR(10), nullable
        Anio:         gradoInsert.Anio        || null,  // YEAR, nullable
    })
    .then(data => {
        response.status(201).send(data);
    })
    .catch(error => {
        response.status(400).send({ message: error.message || "Error al insertar el grado" });
    });
}

async function updateGrado(request, response) {
    const gradoUpdate = request.body;

    Grado.update({
        ID_Clase:     gradoUpdate.ID_Clase    || null,
        Nombre_Grado: gradoUpdate.Nombre_Grado,
        Seccion:      gradoUpdate.Seccion     || null,
        Anio:         gradoUpdate.Anio        || null,
    }, {
        where: { ID_Grado: gradoUpdate.ID_Grado }  // busca por PK
    })
    .then(num => {
        if (num == 1) {
            response.status(200).send({ message: "Grado actualizado correctamente" });
        } else {
            response.status(404).send({ message: "No se encontró el grado" });
        }
    })
    .catch(error => {
        response.status(500).send({ message: error.message || "Error al actualizar el grado" });
    });
}

module.exports = {
    findAll,
    insertGrado,
    updateGrado
}