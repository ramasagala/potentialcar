const express = require('express');
const app = express();
const db = require('./db');

const CarController = require('./controllers/CarController');
app.use('/cars', CarController);

module.exports = app;