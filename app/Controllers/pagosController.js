'use strict'

const db = require('../config/db');
const Pagos = db.pagos;

async function findAll(req, res) {

    try {

        const data = await Pagos.findAll();

        res.status(200).send(data);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

async function insertPago(req, res) {

    try {

        const pago = await Pagos.create({

            DNI_Padre: req.body.DNI_Padre,
            DNI_Alumno: req.body.DNI_Alumno,
            Fecha_Pago: req.body.Fecha_Pago,
            Monto: req.body.Monto,
            Metodo_Pago: req.body.Metodo_Pago,
            Estado: req.body.Estado

        });

        res.status(201).send(pago);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

async function updatePago(req, res) {

    try {

        const [rows] = await Pagos.update({

            DNI_Padre: req.body.DNI_Padre,
            DNI_Alumno: req.body.DNI_Alumno,
            Fecha_Pago: req.body.Fecha_Pago,
            Monto: req.body.Monto,
            Metodo_Pago: req.body.Metodo_Pago,
            Estado: req.body.Estado

        }, {

            where: {
                ID_Pagos: req.body.ID_Pagos
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: 'Pago no encontrado'
            });

        }

        res.status(200).send({
            message: 'Pago actualizado correctamente'
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

module.exports = {
    findAll,
    insertPago,
    updatePago
};