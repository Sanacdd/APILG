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

async function deletePago(req, res){
    const { ID_Pagos } = req.params;

    Pagos.destroy({
        where: { ID_Pagos: ID_Pagos }
    })
    .then(() => {
        res.status(200).send({
            message: "Pago eliminado correctamente"
        });
    })
    .catch(error => {
        res.status(400).send(error);
    });



async function findOne(req, res){
    const { ID_Pagos } = req.params;

    Pagos.findOne({
        where: { ID_Pagos: ID_Pagos }
    })
    .then(data => {
        if(data){
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: "Pago no encontrado"
            });
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
}


}
async function findOne(req, res) {
    const { ID_Pagos } = req.params;

    Pagos.findOne({
        where: { ID_Pagos: ID_Pagos }
    })
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: "Pago no encontrado"
            });
        }
    })
    .catch(error => {
        res.status(500).send(error);
    });
}
module.exports = {
    findAll,
    findOne,
    insertPago,
    updatePago,
    deletePago
}