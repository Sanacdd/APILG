'use strict'

//const { request } = require('../app');
const db = require('../config/db');
const Maestro = db.maestro;  

async function findAll(req, res){
Maestro.findAll()
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