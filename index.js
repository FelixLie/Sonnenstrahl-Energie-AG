const express = require('express');
const bodyParser = require('body-parser');

const provideDatabase = require('./db').createDatabase;
const importCSV = require('./helper/importCSV').importDATA;
const connection = require('./db').getConnectionSonnenstrahl;


const app = express();
app.use(express.static('public'));
app.use(express.static('sources'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create DB
const database = provideDatabase();

// Imports CSV if there is no rate data
const filltable = async () => {
  const conn = await connection();
  let check = await conn.query("SELECT COUNT(*) AS c FROM sonnenstrahl_energie_ag.ratedata;");
  if (check[0].c == 0) {
    importCSV();
  }
}
filltable();

// Routes

// Login Route
app.get("/login", (req, res) => {
  console.log("Abfrage");
  const { password } = req.query;
  if (password == "admin123") {
    res.send("true");
  }
  else {
    res.send("false");
  }
})

//Import Route
app.get("/ImportCSV", async (req, res) => {
  importCSV()
  res.send("Import erfolgreich")
});

//Route for graphical rate calculator
app.get("/raten", async (req, res) => {
  const { zipCode, consumption } = req.query;
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts, ROUND(FixedCosts + VariableCosts * ?, 2) AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ? AND Status = "active";',
   [consumption, zipCode]);
  res.send(rows);
  if (conn) return conn.end();
});

//Route for rate requests
app.get("/rates", async (req, res) => {
  const { zipCode, consumption } = req.query;
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts, FixedCosts + VariableCosts * ? AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ? AND Status = "active";',
   [consumption, zipCode]);
  console.log(rows[1].RateName);
  res.send(rows);
  if (conn) return conn.end();
});

//Route for all rates
app.get("/allrates", async (req, res) => {
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts FROM RateData WHERE Status = "active";');
  res.send(rows);
  console.log(rows[1].RateName);
  if (conn) return conn.end();
});


//Route for incoming orders
app.post("/orders", async (req, res) => {
  const { firstName, lastName, street, streetNumber, zipCode, city, rateId, consumption, agent } = req.body;
  const conn = await connection();
  rows = await conn.query('INSERT INTO Orders (firstName, lastName, street, streetNumber, zipCode, city, RateId, consumption, agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [
    firstName,
    lastName,
    street,
    streetNumber,
    zipCode,
    city,
    rateId,
    consumption,
    agent
  ]);
  console.log(rows);
  res.send("Done");
  if (conn) return conn.end();

})


// localhost:3000
app.listen(3000);

