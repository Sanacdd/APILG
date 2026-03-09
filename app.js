'use strict'

const express = require
('express');
const cors = require('cors');4.5
const app = express();

app.use(
    cors({ origin: "*"})
);

app.use(express.json());
app.use(express.urlencoded({ extended: false
}));


module.exports = app;