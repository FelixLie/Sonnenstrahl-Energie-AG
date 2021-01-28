const express = require('express');
const provideDatabase = require('./db').proviceDatabase;
const RestAPI = require('./rest')
const importCSV = require( "./helper/importCSV" ).importDATA;

const test = {username: "username", password: "12345", email: "asdiop@.de"}

const {email} = test

console.log(email)

const app = express();
const createDatabase = provideDatabase();

app.use(express.static('public'));
app.use(express.static('sources'));
app.listen(3000, () => {
	console.log(`started import`)
	// importCSV().then(() => console.log(`done with import`));
});


