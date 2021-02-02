const mariadb = require('mariadb');
const fs = require("fs");
const csv = require("fast-csv");

// Verbindet sich mit MariaDB
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'SonnenstrahlAG',
  multipleStatements: true
});

const getConnection = async () => {
  return pool.getConnection()
}

// Verbindet sich mit der DB sonnenstrahl_energie_ag
const poolSonnenstrahl = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'SonnenstrahlAG',
  database: 'sonnenstrahl_energie_ag',
});

const getConnectionSonnenstrahl = exports.getConnectionSonnenstrahl = async () => {
  return poolSonnenstrahl.getConnection()
}


// Erstellt Datenbank und Tabellen
const createDatabase = exports.createDatabase = async function createDatabaseFunction() {
  let conn;
  let rows;
  try {
    // Create connection
    conn = await pool.getConnection();
    console.log('Connected to MariaDB!');

    // Execute SQL query
    rows = await conn.query(sqlCommand, function (err, result) {
      if (err) throw err;
      console.log("Database created!");
    });
    console.log(rows);

  } catch (err) {
    throw err;

  } finally {
    if (conn) return conn.end();
  }
}


// SQL query
var sqlCommand = `
CREATE DATABASE IF NOT EXISTS Sonnenstrahl_Energie_AG;
USE Sonnenstrahl_Energie_AG;
CREATE TABLE IF NOT EXISTS RateData (RateName VARCHAR(255), ZipCode INTEGER(5), FixedCosts FLOAT(9,2), VariableCosts FLOAT(9,4), RateId INTEGER PRIMARY KEY AUTO_INCREMENT); 
CREATE TABLE IF NOT EXISTS Orders (OrderId INTEGER PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), street VARCHAR(255), streetNumber INTEGER(10), zipCode INTEGER(5), city VARCHAR(255), RateId INTEGER(10), consumption INT (10), agent VARCHAR(255), FOREIGN KEY (RateId) REFERENCES RateData(RateId));  
`;
