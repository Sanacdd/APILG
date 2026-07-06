'use strict'

const db = require('../config/db');
const Maestro = db.maestro;

async function findAll(req, res) {
    try {
        const data = await Maestro.findAll();

        res.status(200).send(data);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }
}

async function insertMaestro(req, res) {

    try {

        const maestro = await Maestro.create({

            DNI: req.body.DNI,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Telefono: req.body.Telefono || null,
            Correo: req.body.Correo || null

        });

        res.status(201).send(maestro);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

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

async function deleteMaestro(request, response) {
    const id = request.params.id;

    Maestro.destroy({
        where: { ID_Maestro: id }
    })
    .then(num => {
        if (num == 1) {
            response.status(200).send({ message: "Maestro eliminado correctamente" });
        } else {
            response.status(404).send({ message: "No se encontró el maestro" });
        }
    })
    .catch(error => {
        response.status(500).send({ message: error.message || "Error al eliminar el maestro" });
    });
}

module.exports = {

    findAll,
    insertMaestro,
    updateMaestro
}