'use strict'

const db = require('../config/db');

const Calificacion = db.calificacion;
const Alumno = db.alumno;
const Clase = db.clase;

// =========================
// Obtener todas las calificaciones
// =========================
async function findAll(req, res) {
    try {

        const data = await Calificacion.findAll({
            include: [
                {
                    model: Alumno,
                    attributes: ['DNI', 'Nombre', 'Apellido']
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

// =========================
// Registrar calificación
// =========================
async function insertCalificacion(req, res) {

    try {

        const p1 = Number(req.body.Parcial1) || 0;
        const p2 = Number(req.body.Parcial2) || 0;
        const p3 = Number(req.body.Parcial3) || 0;
        const p4 = Number(req.body.Parcial4) || 0;

        const promedio = (p1 + p2 + p3 + p4) / 4;

        const calificacion = await Calificacion.create({

            DNI_Alumno: req.body.DNI_Alumno,
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

// =========================
// Actualizar calificación
// =========================
async function updateCalificacion(req, res) {

    try {

        const p1 = Number(req.body.Parcial1) || 0;
        const p2 = Number(req.body.Parcial2) || 0;
        const p3 = Number(req.body.Parcial3) || 0;
        const p4 = Number(req.body.Parcial4) || 0;

        const promedio = (p1 + p2 + p3 + p4) / 4;

        await Calificacion.update({

            DNI_Alumno: req.body.DNI_Alumno,
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
            message: "Calificación actualizada correctamente"
        });

    } catch (error) {

        res.status(400).send(error);

    }

}

// =========================
// Eliminar calificación
// =========================
async function deleteCalificacion(req, res) {

    try {

        await Calificacion.destroy({

            where: {
                ID_Calificacion: req.params.id
            }

        });

        res.status(200).send({
            message: "Calificación eliminada correctamente"
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