const express = require('express');
const bodyParser = require("body-parser");
const {response} = require('express');

const connection = require("./db").getConnectionSonnenstrahl;

const app = express();
