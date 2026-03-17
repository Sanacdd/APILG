'use strict'

const db = require('../config/db');
const Maestro = db.maestro;  

async function findAll(req, res){
Maestro.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error =>{
      res.status(400).send(error);
    })
}

async function insertMaestro(request, response){
    const maestroInsert = request.body;

    Maestro.create({
        maestro_id: maestroInsert.id,
        first_name: maestroInsert.name,
        last_name: maestroInsert.last,
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updateMaestro(request, response){
    const maestroUpdate = request.body;

    Maestro.update(maestroUpdate, {
        where: { maestro_id: maestroUpdate.id }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Maestro actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el maestro"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el maestro"
        });
    });
}

module.exports = {
    findAll,
    insertMaestro,
    updateMaestro
}