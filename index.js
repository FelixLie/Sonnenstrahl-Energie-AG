const express = require('express');
const provideDatabase = require('./db');
const RestAPI = require('./rest')

const app = express();
const createDatabase = provideDatabase();

app.use(express.static('public'));
app.use(express.static('sources'));
app.listen(3000);


