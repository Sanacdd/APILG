'use strict'

const db = require('../config/db');

const Pagos = db.pagos;
const Padre = db.padre;
const Alumno = db.alumno;

const estadoCuentaService = require('../Service/estadoCuentaService');

async function findAll(req, res) {

    try {

    const data = await Pagos.findAll({
        include: [
            {
                model: Padre
            },
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

async function insertPago(req, res) {

    try {

        const estadoCuenta = await estadoCuentaService.obtenerEstadoCuenta(
            req.body.DNI_Padre,
            new Date().getFullYear()
        );

        const alumno = estadoCuenta.alumnos.find(
            a => a.DNI === req.body.DNI_Alumno
        );

        if (!alumno) {
            return res.status(404).send({
                message: "El alumno no pertenece al padre o no existe."
            });
        }

        const siguiente = alumno.estadoCuenta.siguienteMensualidad;

        if (!siguiente) {
            return res.status(400).send({
                message: "El alumno ya tiene todas las mensualidades registradas."
            });
        }

        const referenciaExiste = await Pagos.findOne({
            where: {
                Numero_Referencia: req.body.Numero_Referencia
            }
        });

        if (referenciaExiste) {
            return res.status(400).send({
                message: "Este número de referencia ya fue registrado."
            });
        }

        const pago = await Pagos.create({

            DNI_Padre: req.body.DNI_Padre,
            DNI_Alumno: req.body.DNI_Alumno,
            Fecha_Pago: req.body.Fecha_Pago,

            Mes_Correspondiente: siguiente.mes,
            Anio_Correspondiente: siguiente.anio,

            Monto: req.body.Monto,
            Numero_Referencia: req.body.Numero_Referencia,
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
            Numero_Referencia: req.body.Numero_Referencia,
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

        const filas = await Pagos.destroy({

            where: {
                ID_Pagos: req.params.id
            }

        });

        if (filas === 0) {

            return res.status(404).send({
                message: "Pago no encontrado"
            });

        }

        res.status(200).send({
            message: "Pago eliminado correctamente"
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
    updatePago,
    deletePago
};