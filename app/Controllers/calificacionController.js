'use strict'

const db = require('../config/db');

const Calificacion = db.calificacion;
const Alumno = db.alumno;
const Clase = db.clase;

// Obtener todas las calificaciones
async function findAll(req, res) {
    try {

        const data = await Calificacion.findAll({
            include: [
                {
                    model: Alumno,
                    attributes: ['ID_Alumno', 'Nombre', 'Apellido']
                },
                {
                    model: Clase,
                    attributes: ['ID_Clase', 'Nombre_Clase']
                }
            ]
        });

        res.status(200).send(data);

    } catch (error) {
        res.status(400).send(error);
    }
}

// Registrar calificación
async function insertCalificacion(req, res) {
    try {

        const promedio =
            (parseFloat(req.body.Parcial1) +
             parseFloat(req.body.Parcial2) +
             parseFloat(req.body.Parcial3) +
             parseFloat(req.body.Parcial4)) / 4;

        const calificacion = await Calificacion.create({

            ID_Alumno: req.body.ID_Alumno,
            ID_Clase: req.body.ID_Clase,

            Parcial1: req.body.Parcial1,
            Parcial2: req.body.Parcial2,
            Parcial3: req.body.Parcial3,
            Parcial4: req.body.Parcial4,

            Promedio: promedio

        });

        res.status(200).send(calificacion);

    } catch (error) {
        res.status(400).send(error);
    }
}

// Actualizar calificación
async function updateCalificacion(req, res) {
    try {

        const promedio =
            (parseFloat(req.body.Parcial1) +
             parseFloat(req.body.Parcial2) +
             parseFloat(req.body.Parcial3) +
             parseFloat(req.body.Parcial4)) / 4;

        await Calificacion.update({

            ID_Alumno: req.body.ID_Alumno,
            ID_Clase: req.body.ID_Clase,

            Parcial1: req.body.Parcial1,
            Parcial2: req.body.Parcial2,
            Parcial3: req.body.Parcial3,
            Parcial4: req.body.Parcial4,

            Promedio: promedio

        }, {

            where: {
                ID_Calificacion: req.body.ID_Calificacion
            }

        });

        res.status(200).send({
            message: "Calificación actualizada"
        });

    } catch (error) {
        res.status(400).send(error);
    }
}

// Eliminar calificación
async function deleteCalificacion(req, res) {
    try {

        await Calificacion.destroy({

            where: {
                ID_Calificacion: req.params.id
            }

        });

        res.status(200).send({
            message: "Calificación eliminada"
        });

    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {

    findAll,
    insertCalificacion,
    updateCalificacion,
    deleteCalificacion

};