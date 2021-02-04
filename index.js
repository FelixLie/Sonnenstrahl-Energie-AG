const express = require('express');
const bodyParser = require('body-parser');

const provideDatabase = require('./db').createDatabase;
const importCSV = require('./helper/importCSV').importDATA;
const connection = require('./db').getConnectionSonnenstrahl;

//const groute = require('./rest').getroute // noch nicht verwendet
//const gr = groute;


const app = express();
app.use(express.static('public'));
app.use(express.static('sources'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create DB
const database = provideDatabase();

// CSV import
importCSV().then(() => console.log(`Import Done!`));



// Routes
app.get("/raten", async (req, res) => {
  const { zipCode, consumption} = req.query;
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts, ROUND(FixedCosts + VariableCosts * ?, 2) AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ? AND Status = "active";', [consumption, zipCode]);
  console.log(rows[1].RateName);
  RateName1 = rows[1].RateName;
  res.send(rows);
  if (conn) return conn.end();
});

app.get("/rates", async (req, res) => {
  const { zipCode, consumption} = req.query;
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts, FixedCosts + VariableCosts * ? AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ? AND Status = "active";', [consumption, zipCode]);
  console.log(rows[1].RateName);
  res.send(rows);
  if (conn) return conn.end();
});


app.get("/allrates", async (req, res) => {
  const conn = await connection();
  rows = await conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts FROM RateData WHERE Status = "active";');
  res.send(rows);
  console.log(rows[1].RateName);
  if (conn) return conn.end();
});

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


// app.listen(3000, () => {
// 	console.log(`Started import!`)
// 	importCSV().then(() => console.log(`Import Done!`));
// });
