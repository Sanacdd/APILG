'use strict'

const db = require('../config/db');
const GradoClase = db.gradoClase;
const Clase = db.clase;

async function asignarClases(req, res) {
    const { ID_Grado, clases } = req.body;

    if (!ID_Grado || !Array.isArray(clases)) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
        await GradoClase.destroy({ where: { ID_Grado } });

        const registros = clases.map(ID_Clase => ({
            ID_Grado,
            ID_Clase
        }));

        await GradoClase.bulkCreate(registros);

        res.status(200).json({ message: "Clases asignadas correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerClasesPorGrado(req, res) {
    const { id } = req.params;

    try {
        const data = await GradoClase.findAll({
            where: { ID_Grado: id },
            include: [{
                model: Clase,
                attributes: ['ID_Clase', 'Nombre_Clase']
            }]
        });

        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    asignarClases,
    obtenerClasesPorGrado
};