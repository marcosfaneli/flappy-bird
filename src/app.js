const express = require('express')
const path = require('path')
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('./database/connection');
const { errors } = require('celebrate');
const dotenv = require('dotenv');

dotenv.config();

const app = express()

mongoose;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/script')))
app.use(express.static(path.join(__dirname, '/img')))
app.use(express.static(path.join(__dirname, '/')))
app.use(routes);
app.use(errors());

module.exports = app;