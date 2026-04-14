'use strict'

const db = require('../config/db');
const Archivo = db.archivo;  

async function findAll(req, res){
    Archivo.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertArchivo(request, response){
    const archivoInsert = request.body;

    Archivo.create({
        Nombre_Archivo: archivoInsert.Nombre_Archivo,
        Tipo_Archivo: archivoInsert.Tipo_Archivo,
        Fecha_Subida: archivoInsert.Fecha_Subida
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updateArchivo(request, response){
    const archivoUpdate = request.body;

    Archivo.update(archivoUpdate, {
        where: { ID_Archivo: archivoUpdate.ID_Archivo }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Archivo actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el archivo"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el archivo"
        });
    });
}

module.exports = {
    findAll,
    insertArchivo,
    updateArchivo
}