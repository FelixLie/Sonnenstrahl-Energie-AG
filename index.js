const express = require('express');
const provideDatabase = require('./db').createDatabase;
const importCSV = require("./helper/importCSV").importDATA;
const RestAPI = require('./rest') // noch nicht verwendet



const app = express();
app.use(express.static('public'));
app.use(express.static('sources'));

// DB erstellen
const database = provideDatabase();

// CSV Import
importCSV().then(() => console.log(`Import Done!`));


app.listen(3000);




// app.listen(3000, () => {
// 	console.log(`Started import!`)
// 	importCSV().then(() => console.log(`Import Done!`));
// });
