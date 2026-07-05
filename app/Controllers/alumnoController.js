'use strict'

const db = require('../config/db');
const Alumno = db.alumno;

async function findAll(req, res) {
  Alumno.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
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



async function updateAlumno(request, response) {
  const alumnoUpdate = request.body;

  Alumno.update(alumnoUpdate, {
    where: { ID_Alumno: alumnoUpdate.ID_Alumno }
  })
    .then(num => {
      if (num == 1) {
        response.status(200).send({
          message: "Alumno actualizado correctamente"
        });
      } else {
        response.status(400).send({
          message: "No se pudo actualizar el alumno"
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: error.message || "Error al actualizar el alumno"
      });
    });
}

async function deleteAlumno(request, response) {
  const id = request.params.id;

  Alumno.destroy({
    where: { ID_Alumno: id }
  })
    .then(num => {
      if (num == 1) {
        response.status(200).send({
          message: "Alumno eliminado correctamente"
        });
      } else {
        response.status(400).send({
          message: "No se pudo eliminar el alumno"
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: error.message || "Error al eliminar el alumno"
      });
    });
}

module.exports = {
  findAll,
  insertAlumno,
  updateAlumno,
  deleteAlumno
}