'use strict'

const db = require('../config/db');
const MaestroGrado = db.maestroGrado;

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

module.exports = {
    asignarMaestro
};