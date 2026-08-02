'use strict'

const db = require('../config/db');

const Pagos = db.pagos;
const Padre = db.padre;
const Alumno = db.alumno;

const estadoCuentaService = require('../Service/estadoCuentaService');

async function findByPadre(req, res) {

    try {

        const alumnos = await Alumno.findAll({
            where: {
                DNI_Padre: req.params.dni
            },
            attributes: ['DNI']
        });

        const dnis = alumnos.map(a => a.DNI);

        const data = await Pagos.findAll({
            where: {
                DNI_Alumno: dnis
            }
        });

        res.status(200).send(data);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

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

        const pagoExistenteMes = await Pagos.findOne({

            where: {

                DNI_Alumno: req.body.DNI_Alumno,
                Mes_Correspondiente: req.body.Mes_Correspondiente,
                Anio_Correspondiente: req.body.Anio_Correspondiente

            }

        });

        if (pagoExistenteMes) {

            return res.status(400).send({
                message: "Este alumno ya tiene registrado el pago de ese mes."
            });

        }

        const referenciaExistente = await Pagos.findOne({

            where: {
                Numero_Referencia: req.body.Numero_Referencia
            }

        });

        if (referenciaExistente) {

            return res.status(400).send({
                message: "Ese número de referencia ya fue registrado."
            });

        }

        const pago = await Pagos.create({

            DNI_Padre: req.body.DNI_Padre,
            DNI_Alumno: req.body.DNI_Alumno,
            Fecha_Pago: req.body.Fecha_Pago,
            Monto: req.body.Monto,
            Metodo_Pago: req.body.Metodo_Pago,
            Mes_Correspondiente: req.body.Mes_Correspondiente,
            Anio_Correspondiente: req.body.Anio_Correspondiente,
            Numero_Referencia: req.body.Numero_Referencia,
            Comprobante: req.body.Comprobante

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
            Mes_Correspondiente: req.body.Mes_Correspondiente,
            Anio_Correspondiente: req.body.Anio_Correspondiente,
            Numero_Referencia: req.body.Numero_Referencia,
            Comprobante: req.body.Comprobante

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

async function deletePago(req, res) {

    try {

        const rows = await Pagos.destroy({

            where: {
                ID_Pagos: req.params.id
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: 'Pago no encontrado'
            });

        }

        res.status(200).send({
            message: 'Pago eliminado correctamente'
        });

    } catch (error) {

        res.status(500).send({
            message: 'No se puede eliminar el pago porque tiene registros asociados'
        });

    }

}

module.exports = {

    findAll,
    findByPadre,
    insertPago,
    updatePago,
    deletePago

};