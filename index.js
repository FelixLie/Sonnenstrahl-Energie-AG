const express = require('express');
const provideDatabase = require('./db').createDatabase;
const importCSV = require('./helper/importCSV').importDATA;
const connection = require("./db").getConnectionSonnenstrahl;
//const groute = require('./rest').getroute // noch nicht verwendet



const app = express();
app.use(express.static('public'));
app.use(express.static('sources'));

// DB erstellen
const database = provideDatabase();

// CSV Import
importCSV().then(() => console.log(`Import Done!`));
//const gr = groute;
//Get Route
app.get("/rates", async (req, res) => {
    const {zipCode = "%", consumption=500} = req.query
    const conn = await connection();
       rows = await conn.query("SELECT Tarifname, Fixkosten, plz, VariableKosten, Fixkosten + VariableKosten * ? AS monatliche_kosten FROM tarifdaten WHERE plz LIKE ?;",[consumption, zipCode]
        );
      res.send(rows);
   if (conn) return conn.end();
    });
app.listen(3000);



// app.listen(3000, () => {
// 	console.log(`Started import!`)
// 	importCSV().then(() => console.log(`Import Done!`));
// });
