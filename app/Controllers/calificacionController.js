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
async function findByPadre(req, res) {
    try {

        const alumnos = await Alumno.findAll({
            where: {
                DNI_Padre: req.params.dni
            },
            attributes: ['DNI']
        });

        const dnis = alumnos.map(a => a.DNI);

        const data = await Calificacion.findAll({
            where: {
                DNI_Alumno: dnis
            },
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
        res.status(400).send({
            message: error.message
        });
    }
}

// =========================
// Registrar calificación
// =========================
async function insertCalificacion(req, res) {

    try {

        // Buscar si ya existe una calificación para ese alumno y esa clase
        let calificacion = await Calificacion.findOne({

            where: {
                DNI_Alumno: req.body.DNI_Alumno,
                ID_Clase: req.body.ID_Clase
            }

        });

        if (!calificacion) {

            // No existía, se crea con lo que venga (incluyendo null si el
            // parcial llega vacío desde el frontend)
            calificacion = await Calificacion.create({

                DNI_Alumno: req.body.DNI_Alumno,
                ID_Clase: req.body.ID_Clase,

                Parcial1: req.body.Parcial1,
                Parcial2: req.body.Parcial2,
                Parcial3: req.body.Parcial3,
                Parcial4: req.body.Parcial4,

                Promedio: 0

            });

        } else {

            // Ya existía: se sobreescribe SIEMPRE con lo que llega del
            // frontend, incluyendo null (antes se ignoraba el null y
            // por eso una nota borrada "regresaba" al guardar)
            calificacion.Parcial1 = req.body.Parcial1;
            calificacion.Parcial2 = req.body.Parcial2;
            calificacion.Parcial3 = req.body.Parcial3;
            calificacion.Parcial4 = req.body.Parcial4;

        }

        // Los parciales vacíos (null) cuentan como 0 solo para este cálculo
        // de respaldo; el promedio "real" que ve el usuario se calcula en
        // el frontend ignorando los vacíos
        const p1 = Number(calificacion.Parcial1) || 0;
        const p2 = Number(calificacion.Parcial2) || 0;
        const p3 = Number(calificacion.Parcial3) || 0;
        const p4 = Number(calificacion.Parcial4) || 0;

        calificacion.Promedio = (p1 + p2 + p3 + p4) / 4;

        await calificacion.save();

        res.status(200).send(calificacion);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

// =========================
// Actualizar calificación
// =========================
async function updateCalificacion(req, res) {

    try {

        const calificacion = await Calificacion.findByPk(
            req.body.ID_Calificacion
        );

        if (!calificacion) {

            return res.status(404).send({
                message: "Calificación no encontrada"
            });

        }

        calificacion.DNI_Alumno = req.body.DNI_Alumno;
        calificacion.ID_Clase = req.body.ID_Clase;

        // Igual que en insertCalificacion: se sobreescribe siempre,
        // sin el "if (!== null)" que impedía borrar una nota
        calificacion.Parcial1 = req.body.Parcial1;
        calificacion.Parcial2 = req.body.Parcial2;
        calificacion.Parcial3 = req.body.Parcial3;
        calificacion.Parcial4 = req.body.Parcial4;

        const p1 = Number(calificacion.Parcial1) || 0;
        const p2 = Number(calificacion.Parcial2) || 0;
        const p3 = Number(calificacion.Parcial3) || 0;
        const p4 = Number(calificacion.Parcial4) || 0;

        calificacion.Promedio = (p1 + p2 + p3 + p4) / 4;

        await calificacion.save();

        res.status(200).send({
            message: "Calificación actualizada correctamente"
        });

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

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
    findByPadre,
    insertCalificacion,
    updateCalificacion,
    deleteCalificacion

};