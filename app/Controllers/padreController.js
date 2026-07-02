'use strict'

const db = require('../config/db');
const Padre = db.padre;
const Alumno = db.alumno;

async function findAll(req, res) {

    try {

        const data = await Padre.findAll({
            include: [
                {
                    model: Alumno
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

async function insertPadre(req, res) {

    try {

        const padre = await Padre.create({

            DNI: req.body.DNI,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Telefono: req.body.Telefono || null,
            Correo: req.body.Correo || null,
            Direccion: req.body.Direccion || null

        });

        res.status(201).send(padre);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

async function updatePadre(req, res) {

    try {

        const [rows] = await Padre.update({

            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Telefono: req.body.Telefono || null,
            Correo: req.body.Correo || null,
            Direccion: req.body.Direccion || null

        }, {

            where: {
                DNI: req.body.DNI
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: 'Padre no encontrado'
            });

        }

        res.status(200).send({
            message: 'Padre actualizado correctamente'
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

async function deletePadre(req, res) {

    try {

        const rows = await Padre.destroy({

            where: {
                DNI: req.params.dni
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: 'Padre no encontrado'
            });

        }

        res.status(200).send({
            message: 'Padre eliminado correctamente'
        });

    } catch (error) {

        res.status(500).send({
            message: 'No se puede eliminar el padre porque tiene registros asociados'
        });

    }

}

module.exports = {
    findAll,
    insertPadre,
    updatePadre,
    deletePadre
};