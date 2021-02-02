const express = require('express');
const provideDatabase = require('./db').createDatabase;
const importCSV = require('./helper/importCSV').importDATA;
const connection = require("./db").getConnectionSonnenstrahl;
const bodyParser = require('body-parser');
//const groute = require('./rest').getroute // noch nicht verwendet



const app = express();
app.use(express.static('public'));
app.use(express.static('sources'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB erstellen
const database = provideDatabase();

// CSV Import
importCSV().then(() => console.log(`Import Done!`));
//const gr = groute;
//Get Route
app.get("/rates", async (req, res) => {
    const {zipCode = "%", consumption=500} = req.query;
    const conn = await connection();
    rows = await conn.query("SELECT RateName, FixedCosts, ZipCode, VariableCosts, FixedCosts + VariableCosts * ? AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ?;",[consumption, zipCode]);
    res.send(rows);
   if (conn) return conn.end();
    });

app.post("/orders", async (req, res) => {
  const {firstName, lastName, street, streetNumber, zipCode, city, rateId, consumption, agent} = req.body;
  const conn = await connection();
  rows = await conn.query("INSERT INTO Orders (firstName, lastName, street, streetNumber, zipCode, city, RateId, consumption, agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",[
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


app.listen(3000);





// app.listen(3000, () => {
// 	console.log(`Started import!`)
// 	importCSV().then(() => console.log(`Import Done!`));
// });
