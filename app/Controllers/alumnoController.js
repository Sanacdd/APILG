'use strict'

const db = require('../config/db');
const Alumno = db.alumno;
const { Op } = require("sequelize");

const Padre = db.padre;
const Grado = db.grado;
const Pagos = db.pagos;

async function findAll(req, res) {

    try {

        const data = await Alumno.findAll({
            include: [
                {
                    model: Padre
                },
                {
                    model: Grado
                },
                {
                    model: Pagos
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

async function insertAlumno(request, response) {

  const alumnoInsert = request.body;

  try {

    const existeAlumno = await Alumno.findOne({
      where: {
        Nombre: alumnoInsert.Nombre,
        Apellido: alumnoInsert.Apellido
      }
    });

    if (existeAlumno) {
      return response.status(400).send({
        message: "Ya existe un alumno con ese nombre y apellido"
      });
    }

    const nuevoAlumno = await Alumno.create({
      ID_Grado: alumnoInsert.ID_Grado,
      Nombre: alumnoInsert.Nombre,
      Apellido: alumnoInsert.Apellido,
      Fecha_Nacimiento: alumnoInsert.Fecha_Nacimiento,
      Direccion: alumnoInsert.Direccion,
      Genero: alumnoInsert.Genero
    });

    response.status(200).send(nuevoAlumno);

  } catch (error) {

    response.status(500).send({
      message: error.message
    });

  }

}



async function updateAlumno(req, res) {

    try {

        const [rows] = await Alumno.update({

            ID_Grado: req.body.ID_Grado,
            DNI_Padre: req.body.DNI_Padre,

            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Fecha_Nacimiento: req.body.Fecha_Nacimiento,
            Direccion: req.body.Direccion,
            Genero: req.body.Genero

        }, {

            where: {
                DNI: req.body.DNI
            }

        });

        if (rows === 0) {

            return res.status(404).send({
                message: 'Alumno no encontrado'
            });

        }

        res.status(200).send({
            message: 'Alumno actualizado correctamente'
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

async function deleteAlumno(req, res) {

    try {

        const filas = await Alumno.destroy({
            where: {
                DNI: req.params.id
            }
        });

        if (filas === 0) {
            return res.status(404).send({
                message: "Alumno no encontrado"
            });
        }

        res.status(200).send({
            message: "Alumno eliminado correctamente"
        });

    } catch (error) {

        res.status(500).send({
            message: error.message
        });

    }

}

async function buscarAlumno(req, res) {

    try {

        const texto = req.query.texto || "";

        const alumnos = await Alumno.findAll({

            where: {

                [Op.or]: [

                    {
                        DNI: {
                            [Op.like]: `%${texto}%`
                        }
                    },

                    {
                        Nombre: {
                            [Op.like]: `%${texto}%`
                        }
                    },

                    {
                        Apellido: {
                            [Op.like]: `%${texto}%`
                        }
                    }

                ]

            },

            include: [
                {
                    model: Padre
                },
                {
                    model: Grado
                }
            ],

            limit: 10

        });

        res.status(200).send(alumnos);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

module.exports = {
    findAll,
    insertAlumno,
    updateAlumno,
    deleteAlumno,
    buscarAlumno
};