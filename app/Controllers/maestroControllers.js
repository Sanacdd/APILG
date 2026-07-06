"use strict";

const db = require("../config/db");
const Maestro = db.maestro;

async function findAll(req, res) {
  try {
    const data = await Maestro.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({
      message: error.message,
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
    });

    res.status(201).send(maestro);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
}

async function updateMaestro(req, res) {
  try {
    const [rows] = await Maestro.update(
      {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Telefono: req.body.Telefono || null,
        Correo: req.body.Correo || null,
      },
      {
        where: {
          DNI: req.body.DNI,
        },
      }
    );

    if (rows === 0) {
      return res.status(404).send({
        message: "Maestro no encontrado",
      });
    }

    res.status(200).send({
      message: "Maestro actualizado correctamente",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function deleteMaestro(req, res) {
  try {
    const rows = await Maestro.destroy({
      where: {
        DNI: req.params.id,
      },
    });

    if (rows === 0) {
      return res.status(404).send({
        message: "Maestro no encontrado",
      });
    }

    res.status(200).send({
      message: "Maestro eliminado correctamente",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function deleteMaestro(req, res) {
    try {
        const filas = await Maestro.destroy({
            where: {
                DNI: req.params.id
            }
        });

        if (filas === 0) {
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
    deleteMaestro,


 

};