'use strict'

const db = require('../config/db');
const Pagos = db.pagos;

async function findAll(req, res){
    Pagos.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertPago(request, response){
    const pagoInsert = request.body;

    Pagos.create({
        ID_Padre: pagoInsert.ID_Padre,
        ID_Alumno: pagoInsert.ID_Alumno,
        Fecha_Pago: pagoInsert.Fecha_Pago,
        Monto: pagoInsert.Monto,
        Metodo_Pago: pagoInsert.Metodo_Pago,
        Estado: pagoInsert.Estado
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updatePago(request, response){
    const pagoUpdate = request.body;

    Pagos.update(pagoUpdate, {
        where: { ID_Pagos: pagoUpdate.ID_Pagos }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Pago actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el pago"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el pago"
        });
    });
}

module.exports = {
    findAll,
    insertPago,
    updatePago
}