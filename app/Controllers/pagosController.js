'use strict'

//const { request } = require('../app');
const db = require('../config/db');
const Pagos = db.pagos;

async function findAll(req, res){
Pagos.findAll()
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