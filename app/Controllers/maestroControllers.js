"use strict";

const db = require("../config/db");

const Maestro = db.maestro;
const MaestroGrado = db.maestroGrado;

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
            Correo: req.body.Correo || null,
            Cargo: req.body.Cargo

        });

        if (req.body.ID_Grado) {

            await MaestroGrado.create({

                DNI_Maestro: req.body.DNI,
                ID_Grado: req.body.ID_Grado,
                Titular: false

            });

        }

        res.status(201).send(maestro);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

async function updateMaestro(req, res) {

    try {
        const dni = req.params.id;

        // Primero borrar la relación maestro-grado
        await db.maestroGrado.destroy({
            where: {
                DNI_Maestro: dni
            }
        });

        // Después borrar el maestro
        const filas = await Maestro.destroy({
            where: {
                DNI: dni
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: "Maestro no encontrado"
            });

        }

        res.status(200).send({
            message: "Maestro actualizado correctamente"
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

async function deleteMaestro(req, res) {

    try {

        const rows = await Maestro.destroy({

            where: {
                DNI: req.params.id
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: "Maestro no encontrado"
            });

        }

        res.status(200).send({
            message: "Maestro eliminado correctamente"
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

module.exports = {

    findAll,
    insertMaestro,
    updateMaestro,
    deleteMaestro

};