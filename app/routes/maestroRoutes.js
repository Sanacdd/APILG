"use strict";

const express = require("express");
const maestroController = require("../Controllers/maestroControllers");

const apiRoutes = express.Router();

apiRoutes
  .get("/maestros", maestroController.findAll)
  .post("/insertMaestro", maestroController.insertMaestro)
  .put("/updateMaestro", maestroController.updateMaestro)
  .delete("/deleteMaestro/:id", maestroController.deleteMaestro);

module.exports = apiRoutes;