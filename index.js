const express = require('express');
const dbAbruf = require('./db');
const RestAPI = require('./rest')

const app = express();
const datenbankabfrage = dbAbruf();

app.use(express.static('public'));
app.use(express.static('sources'));
app.listen(3000);


