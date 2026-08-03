'use strict'

const db = require('../config/db');
const Archivo = db.archivo;
const Alumno = db.alumno;
const Grado = db.grado;
const Calificacion = db.calificacion;
const Clase = db.clase;
const PDFDocument = require('pdfkit');

// ==========================================
// DATOS FIJOS DEL CENTRO EDUCATIVO
// (ajustar aquí si cambian en el futuro)
// ==========================================
const ESCUELA = {
    nombre: 'LUIS GAMERO',
    codigoSace: '070300079B10',
    municipio: 'DANLI',
    departamento: 'EL PARAÍSO',
    directoraNombre: 'M.s.C. Kenia Yojani Aguilera Castellanos',
    directoraTitulo: 'Directora Centro de Educación Básica Luis Gamero',
};

// Valores fijos de la sección "Personalidad" (editables aquí manualmente por ahora)
const PERSONALIDAD_FIJA = {
    puntualidad: 'SOBRESALIENTE',
    espirituTrabajo: 'SOBRESALIENTE',
    ordenPresentacion: 'SOBRESALIENTE',
    sociabilidad: 'SOBRESALIENTE',
    moralidad: 'SOBRESALIENTE',
    diasFaltados: 0,
};

// Convierte el nombre del grado (ej. "Tercero") al formato oficial
// usado por la Secretaría de Educación de Honduras (ciclos I/II/III de Educación Básica)
function formatoGradoOficial(nombreGrado) {
    const mapa = {
        'primero': { texto: 'PRIMER GRADO', ciclo: 'I' },
        'segundo': { texto: 'SEGUNDO GRADO', ciclo: 'I' },
        'tercero': { texto: 'TERCER GRADO', ciclo: 'I' },
        'cuarto': { texto: 'CUARTO GRADO', ciclo: 'II' },
        'quinto': { texto: 'QUINTO GRADO', ciclo: 'II' },
        'sexto': { texto: 'SEXTO GRADO', ciclo: 'II' },
        'septimo': { texto: 'SÉPTIMO GRADO', ciclo: 'III' },
        'octavo': { texto: 'OCTAVO GRADO', ciclo: 'III' },
        'noveno': { texto: 'NOVENO GRADO', ciclo: 'III' },
    };

    const clave = (nombreGrado || '').trim().toLowerCase();
    const info = mapa[clave];

    if (!info) return (nombreGrado || 'No asignado').toUpperCase();

    return `${info.texto} (${info.ciclo} DE EDUCACION BASICA)`;
}

// Convierte un promedio numérico a la valoración cualitativa
function valoracionCualitativa(promedio) {
    const nota = Number(promedio);
    if (isNaN(nota)) return 'N/D';
    if (nota >= 90) return 'EXCELENTE';
    if (nota >= 80) return 'MUY BUENO';
    if (nota >= 70) return 'BUENO';
    if (nota >= 60) return 'REGULAR';
    return 'INSUFICIENTE';
}

function fechaEnLetras() {
    const meses = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
        'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];
    const hoy = new Date();
    return `A LOS ${hoy.getDate()} DIAS DEL MES DE ${meses[hoy.getMonth()]} DEL AÑO ${hoy.getFullYear()}`;
}

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

// ==========================================
// CONSTANCIA DE MATRÍCULA
// ==========================================
async function generarConstanciaMatricula(req, res) {
    const { dni } = req.params;

    try {
        const alumno = await Alumno.findByPk(dni, {
            include: [{ model: Grado }]
        });

        if (!alumno) {
            return res.status(404).send({ message: "Alumno no encontrado" });
        }

        const doc = new PDFDocument({ size: 'LETTER', margin: 70 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=constancia_${alumno.DNI}.pdf`);

        doc.pipe(res);

        doc.fontSize(15).font('Helvetica-Bold').text('CONSTANCIA DE MATRÍCULA', { align: 'center' });
        doc.moveDown(2);

        const nombreCompleto = `${alumno.Nombre} ${alumno.Apellido}`.toUpperCase();
        const gradoTexto = alumno.Grado
            ? formatoGradoOficial(alumno.Grado.Nombre_Grado)
            : 'NO ASIGNADO';
        const seccion = alumno.Grado?.Seccion || '';
        const anio = alumno.Grado?.Anio || new Date().getFullYear();

        doc.fontSize(11).font('Helvetica').text(
            `LA SUSCRITA DIRECTORA DEL CENTRO EDUCATIVO ${ESCUELA.nombre} CON CÓDIGO ${ESCUELA.codigoSace}, ` +
            `UBICADO EN EL MUNICIPIO DE ${ESCUELA.municipio} DEL DEPARTAMENTO DE ${ESCUELA.departamento}, ` +
            `EN USO DE SUS FACULTADES QUE LAS LEYES EDUCATIVAS LE CONFIERE,`,
            { align: 'justify' }
        );
        doc.moveDown();
        doc.font('Helvetica-Bold').text('HACE CONSTAR', { align: 'left' });
        doc.moveDown();

        doc.font('Helvetica').text(
            `QUE SEGÚN CONSTA EN EL LIBRO RESPECTIVO DE ESTA INSTITUCIÓN, SE ENCUENTRA REGISTRADO(A) ` +
            `EL (LA) ALUMNO(A) ${nombreCompleto}, CON NÚMERO DE IDENTIDAD ${alumno.DNI}, ` +
            `DEBIDAMENTE MATRICULADO(A) EN ${gradoTexto}${seccion ? `, SECCIÓN "${seccion}"` : ''}, ` +
            `CORRESPONDIENTE AL AÑO LECTIVO ${anio}.`,
            { align: 'justify' }
        );

        doc.moveDown(2);
        doc.text(
            `Y PARA LOS FINES QUE AL INTERESADO(A) CONVENGA, SE LE EXTIENDE LA PRESENTE ` +
            `EN ${ESCUELA.municipio}, ${ESCUELA.departamento} ${fechaEnLetras()}.`,
            { align: 'justify' }
        );

        doc.moveDown(5);
        doc.font('Helvetica-Bold').text('_____________________________', { align: 'center' });
        doc.text(ESCUELA.directoraNombre, { align: 'center' });
        doc.font('Helvetica').fontSize(9).text(ESCUELA.directoraTitulo, { align: 'center' });

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Error al generar la constancia"
        });
    }
}

// ==========================================
// CERTIFICACIÓN DE ESTUDIOS
// ==========================================
async function generarCertificacionEstudios(req, res) {
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
            include: [{ model: Clase }]
        });

        const doc = new PDFDocument({ size: 'LETTER', margin: 70 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=certificacion_${alumno.DNI}.pdf`);

        doc.pipe(res);

        const LEFT = 70;
        const COL_VALOR = 320;

        doc.fontSize(14).font('Helvetica-Bold').text('CERTIFICACION DE ESTUDIOS', { align: 'center' });
        doc.moveDown(1.2);

        doc.fontSize(10.5).font('Helvetica').text(
            `LA SUSCRITA DIRECTORA DEL CENTRO EDUCATIVO ${ESCUELA.nombre} CON CÓDIGO ${ESCUELA.codigoSace}, ` +
            `UBICADO EN EL MUNICIPIO DE ${ESCUELA.municipio} DEL DEPARTAMENTO DE ${ESCUELA.departamento}, ` +
            `EN USO DE SUS FACULTADES QUE LAS LEYES EDUCATIVAS LE CONFIERE,`,
            { align: 'justify' }
        );
        doc.moveDown();
        doc.font('Helvetica-Bold').fontSize(11).text('CERTIFICA', { align: 'left' });
        doc.moveDown();

        const nombreCompleto = `${alumno.Nombre} ${alumno.Apellido}`.toUpperCase();
        const gradoTexto = alumno.Grado
            ? formatoGradoOficial(alumno.Grado.Nombre_Grado)
            : 'NO ASIGNADO';
        const anio = alumno.Grado?.Anio || new Date().getFullYear();

        doc.font('Helvetica').fontSize(10.5).text(
            `QUE SEGÚN CONSTA EN EL LIBRO RESPECTIVO DE ESTA INSTITUCIÓN EN EL AÑO ${anio}, ` +
            `SE ENCUENTRA REGISTRADO(A) EL (LA) ALUMNO(A) ${nombreCompleto} CON NÚMERO DE IDENTIDAD ${alumno.DNI}, ` +
            `DE ${gradoTexto}, Y OBTUVO LAS VALORACIONES Y CALIFICACIONES SIGUIENTES:`,
            { align: 'justify' }
        );
        doc.moveDown(1.5);

        const filaDosColumnas = (etiqueta, valor, negritaValor = true) => {
            const y = doc.y;
            doc.font('Helvetica').fontSize(10).text(etiqueta, LEFT, y);
            doc.font(negritaValor ? 'Helvetica-Bold' : 'Helvetica').fontSize(10).text(valor, COL_VALOR, y);
            doc.moveDown(0.6);
        };

        doc.font('Helvetica-Bold').fontSize(11).text('PERSONALIDAD', LEFT, doc.y);
        doc.moveDown(0.6);

        filaDosColumnas('Puntualidad', PERSONALIDAD_FIJA.puntualidad);
        filaDosColumnas('Espíritu de trabajo', PERSONALIDAD_FIJA.espirituTrabajo);
        filaDosColumnas('Orden y presentación', PERSONALIDAD_FIJA.ordenPresentacion);
        filaDosColumnas('Sociabilidad', PERSONALIDAD_FIJA.sociabilidad);
        filaDosColumnas('Moralidad', PERSONALIDAD_FIJA.moralidad);

        doc.moveDown(0.8);

        doc.font('Helvetica-Bold').fontSize(11).text('AREAS CURRICULARES', LEFT, doc.y);
        doc.moveDown(0.6);

        if (calificaciones.length === 0) {
            doc.font('Helvetica').fontSize(10).text('No hay calificaciones registradas para este alumno.', LEFT, doc.y);
            doc.moveDown(0.8);
        } else {
            let sumaPromedios = 0;
            let contador = 0;

            calificaciones.forEach((c) => {
                const nombreClase = c.Clase?.Nombre_Clase || 'Materia';
                const promedio = c.Promedio !== null ? Number(c.Promedio) : null;

                if (promedio !== null) {
                    filaDosColumnas(nombreClase, `${promedio.toFixed(0)}% ${valoracionCualitativa(promedio)}`);
                    sumaPromedios += promedio;
                    contador++;
                } else {
                    filaDosColumnas(nombreClase, 'Sin promedio');
                }
            });

            doc.moveDown(0.4);
            filaDosColumnas('DIAS FALTADOS EN EL AÑO', String(PERSONALIDAD_FIJA.diasFaltados));

            if (contador > 0) {
                const promedioFinal = sumaPromedios / contador;
                filaDosColumnas('PROMEDIO FINAL', `${promedioFinal.toFixed(0)}%`);
            }
        }

        doc.moveDown(1.5);
        doc.font('Helvetica').fontSize(10).text(
            `Y PARA LOS FINES QUE AL INTERESADO(A) CONVENGA, SE LE EXTIENDE LA PRESENTE ` +
            `EN ${ESCUELA.municipio}, ${ESCUELA.departamento} ${fechaEnLetras()}.`,
            LEFT, doc.y,
            { align: 'justify', width: 470 }
        );

        doc.moveDown(4);
        doc.font('Helvetica-Bold').fontSize(10).text('_____________________________', { align: 'center' });
        doc.text(ESCUELA.directoraNombre, { align: 'center' });
        doc.font('Helvetica').fontSize(9).text(ESCUELA.directoraTitulo, { align: 'center' });

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Error al generar la certificación"
        });
    }
}

module.exports = {
    findAll,
    insertArchivo,
    updateArchivo,
    generarConstanciaMatricula,
    generarCertificacionEstudios
}