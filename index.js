const express = require('express');
const dbAbruf = require('./db');

const app = express();
const datenbankabfrage = dbAbruf();

app.use(express.static('public'));
app.use(express.static('sources'));
app.listen(3000);


