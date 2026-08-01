"use strict";

const db = require("../config/db");

const Maestro = db.maestro;
const MaestroGrado = db.maestroGrado;
const User = db.user;

const bcrypt = require("bcrypt");

async function findAll(req, res) {
    try {

        const data = await Maestro.findAll({
            include: [
                {
                    model: db.grado,
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        res.status(200).send(data);

    } catch (error) {

        console.error("ERROR AL OBTENER MAESTROS:");   
        console.error(error);                            

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

        // Crear usuario automáticamente
        const existeUsuario = await User.findByPk(req.body.DNI);

        if (!existeUsuario) {

            const password = await bcrypt.hash("1234", 10);

            await User.create({

                userId: req.body.DNI,
                pass: password,
                rolId: 2,
                passwordResetRequired: true

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
        const dni = req.body.DNI;

        if (!dni) {
            return res.status(400).send({
                message: "DNI es requerido"
            });
        }

        // Actualizar los datos del maestro
        const [filas] = await Maestro.update({
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Telefono: req.body.Telefono || null,
            Correo: req.body.Correo || null,
            Cargo: req.body.Cargo
        }, {
            where: {
                DNI: dni
            }
        });

        if (filas === 0) {
            return res.status(404).send({
                message: "Maestro no encontrado"
            });
        }

        // Actualizar la relación maestro-grado
        await db.maestroGrado.destroy({
            where: {
                DNI_Maestro: dni
            }
        });

        if (req.body.ID_Grado) {
            await db.maestroGrado.create({
                DNI_Maestro: dni,
                ID_Grado: req.body.ID_Grado,
                Titular: false
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

        const dni = req.params.id;

        // Eliminar primero la relación maestro-grado
        await db.maestroGrado.destroy({
            where: {
                DNI_Maestro: dni
            }
        });

        const rows = await Maestro.destroy({

            where: {
                DNI: dni
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: "Maestro no encontrado"
            });

        }

        // Eliminar el usuario de acceso del maestro
        await User.destroy({
            where: {
                userId: dni
            }
        });

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