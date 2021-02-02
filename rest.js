const express = require('express');
const bodyParser = require("body-parser");
const connection = require("./db").getConnectionSonnenstrahl;
const {response} = require('express');

const app = express();
