'use strict'

const db = require('../config/db');
const Padre = db.padre;

async function findAll(req, res) {
    Padre.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertPadre(request, response) {
    const padreInsert = request.body;

    Padre.create({
        ID_Alumno: padreInsert.ID_Alumno  || null,  
        Nombre:    padreInsert.Nombre,               
        Apellido:  padreInsert.Apellido,             
        Telefono:  padreInsert.Telefono   || null,  
        Correo:    padreInsert.Correo     || null,  
        Direccion: padreInsert.Direccion  || null,  
    })
    .then(data => {
        response.status(201).send(data);
    })
    .catch(error => {
        response.status(400).send({ message: error.message || "Error al insertar el padre" });
    });
}

async function updatePadre(request, response) {
    const padreUpdate = request.body;

    Padre.update({
        ID_Alumno: padreUpdate.ID_Alumno  || null,
        Nombre:    padreUpdate.Nombre,
        Apellido:  padreUpdate.Apellido,
        Telefono:  padreUpdate.Telefono   || null,
        Correo:    padreUpdate.Correo     || null,
        Direccion: padreUpdate.Direccion  || null,
    }, {
        where: { ID_Padre: padreUpdate.ID_Padre }  // busca por PK
    })
    .then(num => {
        if (num == 1) {
            response.status(200).send({ message: "Padre actualizado correctamente" });
        } else {
            response.status(404).send({ message: "No se encontró el padre" });
        }
    })
    .catch(error => {
        response.status(500).send({ message: error.message || "Error al actualizar el padre" });
    });
}

module.exports = {
    findAll,
    insertPadre,
    updatePadre
}