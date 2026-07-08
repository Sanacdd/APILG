'use strict'

const db = require('../config/db');
const Archivo = db.archivo;
const Alumno = db.alumno;
const Grado = db.grado;
const PDFDocument = require('pdfkit');

async function findAll(req, res){
    Archivo.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function insertArchivo(request, response){
    const archivoInsert = request.body;

    Archivo.create({
        Nombre_Archivo: archivoInsert.Nombre_Archivo,
        Tipo_Archivo: archivoInsert.Tipo_Archivo,
        Fecha_Subida: archivoInsert.Fecha_Subida
    })
    .then(data => {
        response.status(200).send(data);
    })
    .catch(error => {
        response.status(400).send(error);
    });
}

async function updateArchivo(request, response){
    const archivoUpdate = request.body;

    Archivo.update(archivoUpdate, {
        where: { ID_Archivo: archivoUpdate.ID_Archivo }
    })
    .then(num => {
        if(num == 1){
            response.status(200).send({
                message: "Archivo actualizado correctamente"
            });
        } else {
            response.status(400).send({
                message: "No se pudo actualizar el archivo"
            });
        }
    })
    .catch(error => {
        response.status(500).send({
            message: error.message || "Error al actualizar el archivo"
        });
    });
}

async function generarConstanciaMatricula(req, res) {
    const { dni } = req.params;

    try {
        const alumno = await Alumno.findByPk(dni, {
            include: [{ model: Grado }]
        });

        if (!alumno) {
            return res.status(404).send({ message: "Alumno no encontrado" });
        }

        const doc = new PDFDocument({ size: 'LETTER', margin: 60 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=constancia_${alumno.DNI}.pdf`);

        doc.pipe(res);

        doc.fontSize(16).font('Helvetica-Bold').text('ESCUELA LUIS GAMERO', { align: 'center' });
        doc.fontSize(10).font('Helvetica').text('Sistema Escolar', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(14).font('Helvetica-Bold').text('CONSTANCIA DE MATRÍCULA', { align: 'center' });
        doc.moveDown(2);

        const nombreCompleto = `${alumno.Nombre} ${alumno.Apellido}`;
        const gradoTexto = alumno.Grado
            ? `${alumno.Grado.Nombre_Grado}${alumno.Grado.Seccion ? ' "' + alumno.Grado.Seccion + '"' : ''}`
            : 'No asignado';
        const anio = alumno.Grado?.Anio || new Date().getFullYear();

        doc.fontSize(12).font('Helvetica').text(
            `Por medio de la presente, se hace constar que el/la alumno(a) ${nombreCompleto}, ` +
            `identificado(a) con DNI No. ${alumno.DNI}, se encuentra debidamente matriculado(a) en el grado ` +
            `${gradoTexto}, correspondiente al año lectivo ${anio}.`,
            { align: 'justify' }
        );

        doc.moveDown(2);
        const fechaHoy = new Date().toLocaleDateString('es-HN', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`Se extiende la presente constancia a solicitud de la parte interesada, el ${fechaHoy}.`);

        doc.moveDown(5);
        doc.text('_____________________________', { align: 'center' });
        doc.text('Firma y sello', { align: 'center' });

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Error al generar la constancia"
        });
    }
}

module.exports = {
    findAll,
    insertArchivo,
    updateArchivo,
    generarConstanciaMatricula
}