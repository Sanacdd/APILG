'use strict'

const app = require('./app');

const port =process.env.port || 3000;

app .alisten(parseInt(port), function(eror){
    if(error)return console.error(error)
        console.info(`app corriendo en puerto${port}`);
})