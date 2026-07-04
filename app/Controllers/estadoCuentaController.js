'use strict';

const estadoCuentaService = require('../Service/estadoCuentaService');

async function obtenerEstadoCuenta(req, res) {

    try {

        const { dniPadre, anio } = req.params;

        const resultado = await estadoCuentaService.obtenerEstadoCuenta(
            dniPadre,
            parseInt(anio)
        );

        res.status(200).send(resultado);

    } catch (error) {

        res.status(400).send({
            message: error.message
        });

    }

}

module.exports = {
    obtenerEstadoCuenta
};