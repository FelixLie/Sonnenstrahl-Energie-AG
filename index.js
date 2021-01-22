const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.static('sources'));
app.listen(3000);