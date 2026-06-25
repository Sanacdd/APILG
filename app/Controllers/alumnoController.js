'use strict'

//const { request } = require('../app');
const db = require('../config/db');
const Actor = db.alumno;  

//funcion del control hace traer la data, convertirla
//llamdo de actor y decir que hacer todo eso
async function findAll(req, res){
Actor.findAll()
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