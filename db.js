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
CREATE TABLE IF NOT EXISTS Tarifdaten (Tarifname VARCHAR(255), PLZ INTEGER(5), Fixkosten FLOAT(9,2), VariableKosten FLOAT(9,4), Tarif_Id INTEGER PRIMARY KEY AUTO_INCREMENT); 
`;
