'use strict';

const db = require('../config/db');

const Padre = db.padre;
const Alumno = db.alumno;
const Pagos = db.pagos;

async function buscarPadre(dniPadre) {

    return await Padre.findOne({
        where: {
            DNI: dniPadre
        }
    });

}

async function buscarAlumnos(dniPadre) {

    return await Alumno.findAll({
        where: {
            DNI_Padre: dniPadre
        },
        include: [
            {
                model: Pagos
            }
        ]
    });

}

const NOMBRES_MESES = {
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre"
};

function calcularEstadoCuentaAlumno(alumno, anioEscolar) {
    const pagos = alumno.Pagos || [];

    const mesesEscolares = [2,3,4,5,6,7,8,9,10,11];

    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;

    // Nunca mostrar meses anteriores a febrero
    const ultimoMesVencido = Math.max(2, Math.min(mesActual, 11));

    const mesesVencidos = mesesEscolares.filter(
        mes => mes <= ultimoMesVencido
    );

    const pendientes = [];

    for (const mes of mesesVencidos) {

        const existePago = pagos.find(p =>
            p.Mes_Correspondiente === mes &&
            p.Anio_Correspondiente === anioEscolar
        );

        if (!existePago) {

            for (const mesPendiente of mesesVencidos) {

                if (mesPendiente >= mes) {

                    pendientes.push({
                        mes: mesPendiente,
                        nombre: NOMBRES_MESES[mesPendiente],
                        anio: anioEscolar
                    });

                }

            }

            return {
                siguienteMensualidad: {
                    mes,
                    nombre: NOMBRES_MESES[mes],
                    anio: anioEscolar
                },
                solventeHasta: mes === 2
                    ? null
                    : {
                        mes: mes - 1,
                        nombre: NOMBRES_MESES[mes - 1],
                        anio: anioEscolar
                    },
                pendientes
            };

        }

    }

   return {
    siguienteMensualidad: null,
    solventeHasta: {
            mes: 11,
            nombre: NOMBRES_MESES[11],
            anio: anioEscolar
        },
        pendientes: []
    };
}

async function obtenerEstadoCuenta(dniPadre, anioEscolar) {

    const padre = await buscarPadre(dniPadre);

    if (!padre) {
        throw new Error("Padre no encontrado");
    }

    const alumnos = await buscarAlumnos(dniPadre);

    const resultadoAlumnos = alumnos.map(alumno => {

        const estadoAlumno = calcularEstadoCuentaAlumno(alumno, anioEscolar);

        return {
            ...alumno.toJSON(),
            estadoCuenta: estadoAlumno
        };

    });

    return {
        padre,
        alumnos: resultadoAlumnos
    };

}

module.exports = {
    obtenerEstadoCuenta
};