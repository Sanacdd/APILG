'use strict'
const db = require('../config/db');
const Grado = db.grado;

async function findAll(req, res) {
    Grado.findAll({
        include: [{
            model: db.clase,
            attributes: ['ID_Clase', 'Nombre_Clase']
        }]
    })
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(error));
}

async function insertGrado(req, res) {
    const g = req.body;
    const existe = await Grado.findOne({
        where: {
            Nombre_Grado: g.Nombre_Grado,
            Seccion: g.Seccion,
            Anio: g.Anio
        }
    });
    if (existe) {
        return res.status(400).json({ error: `Ya existe el grado ${g.Nombre_Grado} sección ${g.Seccion} del año ${g.Anio}` });
    }
    Grado.create({
        ID_Clase: g.ID_Clase || null,
        Nombre_Grado: g.Nombre_Grado,
        Seccion: g.Seccion || null,
        Anio: g.Anio || null,
    })
    .then(data => res.status(201).send(data))
    .catch(error => res.status(400).send(error));
}

async function updateGrado(req, res) {
    const g = req.body;
    Grado.update({
        ID_Clase: g.ID_Clase || null,
        Nombre_Grado: g.Nombre_Grado,
        Seccion: g.Seccion || null,
        Anio: g.Anio || null,
    }, {
        where: { ID_Grado: g.ID_Grado }
    })
    .then(([num]) => {
        if (num == 1) {
            res.send("Actualizado");
        } else {
            res.send("No encontrado");
        }
    })
    .catch(error => res.status(500).send(error));
}

async function deleteGrado(req, res) {
    const id = req.params.id;
    Grado.destroy({
        where: { ID_Grado: id }
    })
    .then(num => {
        if (num == 1) {
            res.send("Eliminado");
        } else {
            res.send("No encontrado");
        }
    })
    .catch(error => {
        res.status(500).json({ error: "No se puede eliminar el grado porque tiene alumnos o maestros asignados" });
    });
}

module.exports = {
    findAll,
    insertGrado,
    updateGrado,
    deleteGrado
};