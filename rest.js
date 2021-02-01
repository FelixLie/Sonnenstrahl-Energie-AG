const express = require('express');
const bodyParser = require("body-parser");
const connection = require("./db").getConnectionSonnenstrahl;
const {response} = require('express');

const app = express();
//app.use(bodyParser.json());

/*const getroute = exports.getroute = app.get("/rates", async (req, res) => {
 
    const conn = await connection();
  //   rows = await conn.query("SELECT Tarifname, Fixkosten, plz, VariableKosten * ? FROM tarife WHERE plz = ?;", /req.body.consumption, req.body.zipCode, function (err, result) {
       rows = await conn.query("SELECT Tarifname, Fixkosten, plz, VariableKosten FROM tarife;", function (err, result) {
        console.log("data selected");
      });
      console.log(rows);
   if (conn) return conn.end();
}); */
/*const postroute = exports.postroute = app.post("/orders", async (req, res) => {
    const db = await database(TODO);
    const created = await db.run(
        "INSERT INTO kunden (Vorname, Nachname, Straße, Nummer, plz, ort, tarifid, verbrauch, partner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        req.body.firstName,
        req.body.lastName,
        req.body.street,
        req.body.streetNumber,
        req.body.zipCode,
        req.body.city,
        req.body.rateId,
        req.body.consumption,
        req.body.agent
    );
    const Kunde = await db.get("SELECT * FROM kunden WHERE KundenID = ", [created.lastID]);
    response.status(201).send(book);
})*/