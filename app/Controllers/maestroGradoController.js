'use strict'

const db = require('../config/db');
const MaestroGrado = db.maestroGrado;
const Grado = db.grado;
const Alumno = db.alumno;

async function asignarMaestro(req, res) {
    const { ID_Grado, DNI_Maestro } = req.body;

    if (!ID_Grado || !DNI_Maestro) {
        return res.status(400).json({
            error: "Datos incompletos"
        });
    }

    try {
        await MaestroGrado.destroy({
            where: { ID_Grado }
        });

        await MaestroGrado.create({
            ID_Grado,
            DNI_Maestro,
            Titular: true
        });

        res.status(200).json({
            message: "Maestro asignado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
async function obtenerAlumnosPorMaestro(req, res) {
    try {

        const dniMaestro = req.params.dni;

        const asignaciones = await MaestroGrado.findAll({
            where: {
                DNI_Maestro: dniMaestro
            }
        });

        if (asignaciones.length === 0) {
            return res.status(404).json({
                message: "El maestro no tiene grados asignados"
            });
        }

        const resultado = [];

        for (const asignacion of asignaciones) {

            const grado = await Grado.findByPk(asignacion.ID_Grado);

            const alumnos = await Alumno.findAll({
                where: {
                    ID_Grado: asignacion.ID_Grado
                }
            });

            resultado.push({
                grado,
                alumnos
            });

        }

        return res.status(200).json(resultado);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
}

module.exports = {
    asignarMaestro,
    obtenerAlumnosPorMaestro
};