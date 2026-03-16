'use strict'

//const { request } = require('../app');
const db = require('../config/db');
const Padre = db.padre;

//funcion del control hace traer la data, convertirla
//llamdo de Padre y decir que hacer todo eso
async function findAll(req, res){
Padre.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error =>{;
      res.status(400).send(error);
})
}
module.exports = {
    findAll
}