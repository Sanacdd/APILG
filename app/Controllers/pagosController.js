'use strict'

const db = require('../config/db');
const Pagos = db.pagos;

async function findAll(req, res) {
  try {
    const data = await Pagos.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function insertPago(req, res) {
  try {
    const pagoInsert = req.body;

    const data = await Pagos.create({
      DNI_Padre: pagoInsert.DNI_Padre,
      DNI_Alumno: pagoInsert.DNI_Alumno,
      Fecha_Pago: pagoInsert.Fecha_Pago,
      Monto: pagoInsert.Monto,
      Metodo_Pago: pagoInsert.Metodo_Pago,
      Mes_Correspondiente: pagoInsert.Mes_Correspondiente,
      Anio_Correspondiente: pagoInsert.Anio_Correspondiente,
      Numero_Referencia: pagoInsert.Numero_Referencia,
      Comprobante: pagoInsert.Comprobante
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function updatePago(req, res) {
  try {
    const pagoUpdate = req.body;

    const [num] = await Pagos.update(pagoUpdate, {
      where: { ID_Pagos: pagoUpdate.ID_Pagos }
    });

    if (num === 1) {
      res.status(200).send({ message: "Pago actualizado correctamente" });
    } else {
      res.status(400).send({ message: "No se pudo actualizar el pago" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error al actualizar el pago"
    });
  }
}

async function deletePago(req, res) {
  try {
    const { ID_Pagos } = req.params;

    await Pagos.destroy({
      where: { ID_Pagos }
    });

    res.status(200).send({
      message: "Pago eliminado correctamente"
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function findOne(req, res) {
  try {
    const { ID_Pagos } = req.params;

    const data = await Pagos.findOne({
      where: { ID_Pagos }
    });

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  findAll,
  findOne,
  insertPago,
  updatePago,
  deletePago
}