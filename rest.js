const express = require('express');
const bodyParser = require("body-parser");
const {response} = require('express');

const app = express();
app.use(bodyParser.json());

app.get("/rates", async (req, res) => {
    const db = await database(TODO);
    const results = await db("SELECT tarifname, fixkosten, plz, varkosten * ? FROM tarife WHERE plz = ?;", req.query.consumption, req.query.zipCode);
    res.status(201).send(results);
})
app.post("/orders", async (req, res) => {
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
})