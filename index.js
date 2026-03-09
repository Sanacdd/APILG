'use strict'
const db = require("./app/config/db");
const app = require("./app/app");

const PORT = process.env.PORT || 3300;

db.sequelizeInstance.sync()
  .then(() => {
    console.log("synced");
    app.listen(parseInt(PORT), function(error) {
      if(error) return console.error(error);
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Fallo al sincronizarse", error);
  });