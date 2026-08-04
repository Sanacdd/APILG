'use strict'

const path = require('path');
const db = require('../config/db');

const Calificacion = db.calificacion;
const Alumno = db.alumno;
const Clase = db.clase;
const Grado = db.grado;
const PDFDocument = require('pdfkit');

const RUTA_BANNER = path.join(__dirname, '../assets/banner_gobierno.png');
const RUTA_ESCUDO = path.join(__dirname, '../assets/escudo_escuela.png');

// Mismo dibujo de membrete que en archivoController.js, con el escudo más grande y espaciado ajustado
function dibujarMembrete(doc, margenIzq, anchoUtil) {
    const anchoBanner = anchoUtil * 0.62;
    const altoBanner = anchoBanner * (102 / 710);
    const xBanner = margenIzq + (anchoUtil - anchoBanner) / 2;
    const yBanner = 25;

    try {
        doc.image(RUTA_BANNER, xBanner, yBanner, { width: anchoBanner });
    } catch (e) {
        console.error('No se pudo cargar el banner de gobierno:', e.message);
    }

    const yDespuesBanner = yBanner + altoBanner + 8;

    // Escudo más grande (90) para mantener consistencia con los demás controladores
    const anchoEscudo = 90;
    const altoEscudo = anchoEscudo * (108 / 76);
    const xEscudo = margenIzq + (anchoUtil / 2) - (anchoEscudo / 2);

    try {
        doc.image(RUTA_ESCUDO, xEscudo, yDespuesBanner, { width: anchoEscudo });
    } catch (e) {
        console.error('No se pudo cargar el escudo de la escuela:', e.message);
    }

    return yDespuesBanner + altoEscudo + 14;
}

// =========================
// Obtener todas las calificaciones
// =========================
async function findAll(req, res) {
    try {

        const data = await Calificacion.findAll({
            include: [
                {
                    model: Alumno,
                    attributes: ['DNI', 'Nombre', 'Apellido']
                },
                {
                    model: Clase,
                    attributes: ['ID_Clase', 'Nombre_Clase']
                }
            ]
        });

        res.status(200).send(data);

    } catch (error) {
        res.status(400).send(error);
    }
}

async function findByPadre(req, res) {
    try {

        const alumnos = await Alumno.findAll({
            where: {
                DNI_Padre: req.params.dni
            },
            attributes: ['DNI']
        });

        const dnis = alumnos.map(a => a.DNI);

        const data = await Calificacion.findAll({
            where: {
                DNI_Alumno: dnis
            },
            include: [
                {
                    model: Alumno,
                    attributes: ['DNI', 'Nombre', 'Apellido']
                },
                {
                    model: Clase,
                    attributes: ['ID_Clase', 'Nombre_Clase']
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

// =========================
// Registrar calificación
// =========================
async function insertCalificacion(req, res) {

    try {

        let calificacion = await Calificacion.findOne({

            where: {
                DNI_Alumno: req.body.DNI_Alumno,
                ID_Clase: req.body.ID_Clase
            }

        });

        if (!calificacion) {

            calificacion = await Calificacion.create({

                DNI_Alumno: req.body.DNI_Alumno,
                ID_Clase: req.body.ID_Clase,

                Parcial1: req.body.Parcial1,
                Parcial2: req.body.Parcial2,
                Parcial3: req.body.Parcial3,
                Parcial4: req.body.Parcial4,

                Promedio: 0

            });

        } else {

            calificacion.Parcial1 = req.body.Parcial1;
            calificacion.Parcial2 = req.body.Parcial2;
            calificacion.Parcial3 = req.body.Parcial3;
            calificacion.Parcial4 = req.body.Parcial4;

        }

        const parciales = [
            calificacion.Parcial1,
            calificacion.Parcial2,
            calificacion.Parcial3,
            calificacion.Parcial4
        ].filter(p => p !== null && p !== undefined && p !== "")
         .map(Number);

        calificacion.Promedio = parciales.length === 0
            ? null
            : parciales.reduce((suma, valor) => suma + valor, 0) / parciales.length;

        await calificacion.save();

        res.status(200).send(calificacion);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

// =========================
// Actualizar calificación
// =========================
async function updateCalificacion(req, res) {

    try {

        const calificacion = await Calificacion.findByPk(
            req.body.ID_Calificacion
        );

        if (!calificacion) {

            return res.status(404).send({
                message: "Calificación no encontrada"
            });

        }

        calificacion.DNI_Alumno = req.body.DNI_Alumno;
        calificacion.ID_Clase = req.body.ID_Clase;

        calificacion.Parcial1 = req.body.Parcial1;
        calificacion.Parcial2 = req.body.Parcial2;
        calificacion.Parcial3 = req.body.Parcial3;
        calificacion.Parcial4 = req.body.Parcial4;

        const parciales = [
            calificacion.Parcial1,
            calificacion.Parcial2,
            calificacion.Parcial3,
            calificacion.Parcial4
        ].filter(p => p !== null && p !== undefined && p !== "")
         .map(Number);

        calificacion.Promedio = parciales.length === 0
            ? null
            : parciales.reduce((suma, valor) => suma + valor, 0) / parciales.length;

        await calificacion.save();

        res.status(200).send({
            message: "Calificación actualizada correctamente"
        });

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

// =========================
// Eliminar calificación
// =========================
async function deleteCalificacion(req, res) {

    try {

        await Calificacion.destroy({

            where: {
                ID_Calificacion: req.params.id
            }

        });

        res.status(200).send({
            message: "Calificación eliminada correctamente"
        });

    } catch (error) {

        res.status(400).send(error);

    }

}

// =========================
// Boletín individual de calificaciones (un alumno por PDF, con membrete completo)
// =========================
async function generarBoletinAlumno(req, res) {
    const { dni } = req.params;

    try {
        const alumno = await Alumno.findByPk(dni, {
            include: [{ model: Grado }]
        });

        if (!alumno) {
            return res.status(404).send({ message: "Alumno no encontrado" });
        }

        const calificaciones = await Calificacion.findAll({
            where: { DNI_Alumno: dni },
            include: [{ model: Clase, attributes: ['ID_Clase', 'Nombre_Clase'] }]
        });

        const doc = new PDFDocument({ size: 'LETTER', margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=boletin_${alumno.DNI}.pdf`);

        doc.pipe(res);

        const LEFT = 50;
        const ANCHO_UTIL = 612 - LEFT * 2;

        const yInicioTexto = dibujarMembrete(doc, LEFT, ANCHO_UTIL);
        doc.y = yInicioTexto;

        // Encabezado
        doc.fontSize(16).font('Helvetica-Bold').text('BOLETÍN DE CALIFICACIONES', { align: 'center' });
        doc.moveDown(1.2);

        const gradoTexto = alumno.Grado
            ? `${alumno.Grado.Nombre_Grado} - ${alumno.Grado.Seccion || 'Única'}`
            : 'No asignado';
        const anio = alumno.Grado?.Anio || new Date().getFullYear();

        doc.fontSize(10.5).font('Helvetica-Bold').text('Alumno: ', LEFT, doc.y, { continued: true });
        doc.font('Helvetica').text(`${alumno.Nombre} ${alumno.Apellido}`);

        doc.font('Helvetica-Bold').text('DNI: ', LEFT, doc.y, { continued: true });
        doc.font('Helvetica').text(alumno.DNI);

        doc.font('Helvetica-Bold').text('Grado: ', LEFT, doc.y, { continued: true });
        doc.font('Helvetica').text(gradoTexto);

        doc.font('Helvetica-Bold').text('Año lectivo: ', LEFT, doc.y, { continued: true });
        doc.font('Helvetica').text(String(anio));

        doc.moveDown(1.5);

        // Tabla de materias
        const columnas = [
            { titulo: 'Materia', ancho: 160 },
            { titulo: 'Parcial 1', ancho: 60 },
            { titulo: 'Parcial 2', ancho: 60 },
            { titulo: 'Parcial 3', ancho: 60 },
            { titulo: 'Parcial 4', ancho: 60 },
            { titulo: 'Promedio', ancho: 55 },
            { titulo: 'Estado', ancho: 45 }
        ];
        const ALTO_FILA = 24;

        const formatearNota = (n) => (n === null || n === undefined ? '-' : Number(n).toFixed(2));

        const dibujarEncabezadoTabla = (y) => {
            let x = LEFT;
            doc.font('Helvetica-Bold').fontSize(9);
            columnas.forEach((col) => {
                doc.rect(x, y, col.ancho, ALTO_FILA).fillAndStroke('#1f2937', '#000000');
                doc.fillColor('#ffffff').text(col.titulo, x + 4, y + 7, { width: col.ancho - 8 });
                x += col.ancho;
            });
            doc.fillColor('#000000');
            return y + ALTO_FILA;
        };

        const dibujarFila = (y, valores, colorFondo) => {
            let x = LEFT;
            doc.font('Helvetica').fontSize(9);
            valores.forEach((valor, i) => {
                const col = columnas[i];
                doc.rect(x, y, col.ancho, ALTO_FILA).fillAndStroke(colorFondo, '#cccccc');
                doc.fillColor('#000000').text(String(valor), x + 4, y + 7, { width: col.ancho - 8 });
                x += col.ancho;
            });
            return y + ALTO_FILA;
        };

        let y = doc.y;
        y = dibujarEncabezadoTabla(y);

        let sumaPromedios = 0;
        let contadorMaterias = 0;

        if (calificaciones.length === 0) {
            doc.font('Helvetica').fontSize(10).text(
                'Este alumno no tiene calificaciones registradas.',
                LEFT, y + 10
            );
        } else {
            calificaciones.forEach((c, idx) => {
                const parciales = [c.Parcial1, c.Parcial2, c.Parcial3, c.Parcial4]
                    .filter(p => p !== null && p !== undefined && p !== "")
                    .map(Number);

                const promedio = parciales.length === 0
                    ? null
                    : parciales.reduce((suma, v) => suma + v, 0) / parciales.length;

                const estado = promedio === null
                    ? '-'
                    : (promedio >= 70 ? 'Aprobado' : 'Reprobado');

                const colorFondo = idx % 2 === 0 ? '#ffffff' : '#f3f4f6';

                y = dibujarFila(y, [
                    c.Clase?.Nombre_Clase || 'Materia',
                    formatearNota(c.Parcial1),
                    formatearNota(c.Parcial2),
                    formatearNota(c.Parcial3),
                    formatearNota(c.Parcial4),
                    formatearNota(promedio),
                    estado
                ], colorFondo);

                if (promedio !== null) {
                    sumaPromedios += promedio;
                    contadorMaterias++;
                }
            });
        }

        doc.moveDown(2);

        if (contadorMaterias > 0) {
            const promedioGeneral = sumaPromedios / contadorMaterias;
            doc.font('Helvetica-Bold').fontSize(11).text(
                `PROMEDIO GENERAL: ${promedioGeneral.toFixed(2)}  —  ${promedioGeneral >= 70 ? 'APROBADO' : 'REPROBADO'}`,
                LEFT
            );
        }

        doc.moveDown(4);
        doc.font('Helvetica-Bold').fontSize(10).text('_____________________________', { align: 'center' });
        doc.font('Helvetica').fontSize(9).text('Firma y sello', { align: 'center' });

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Error al generar el boletín"
        });
    }
}

module.exports = {

    findAll,
    findByPadre,
    insertCalificacion,
    updateCalificacion,
    deleteCalificacion,
    generarBoletinAlumno

};