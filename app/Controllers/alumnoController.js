'use strict'

const db = require('../config/db');
const Actor = db.alumno;  

async function findAll(req, res){
    Actor.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertAlumno(request, response){
    const alumnoInsert = request.body;

    Actor.create({
        alumno_id: alumnoInsert.id,
        first_name: alumnoInsert.name,
        last_name: alumnoInsert.last,
        // Agrega los demás campos de tu tabla alumno
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updateAlumno(request, response){
    const alumnoUpdate = request.body;

    Actor.update(alumnoUpdate, {
        where: { alumno_id: alumnoUpdate.id }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Alumno actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el alumno"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el alumno"
        });
    });
}

module.exports = {
    findAll,
    insertAlumno,
    updateAlumno
}