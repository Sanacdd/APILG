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
        });
}

async function insertClase(request, response){
    const claseInsert = request.body;

    Clase.create({
        nombre: claseInsert.nombre,
        descripcion: claseInsert.descripcion,
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updateClase(request, response){
    const claseUpdate = request.body;

    Clase.update(claseUpdate, {
        where: { id: claseUpdate.id }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Clase actualizada correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar la clase"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar la clase"
        });
    });
}

module.exports = {
    findAll,
    insertClase,
    updateClase
}