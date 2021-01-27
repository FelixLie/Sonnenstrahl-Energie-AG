const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'SonnenstrahlAG',
    multipleStatements: true
    //database: 'test',
});

async function provideDatabase() {
    let conn;
    try {
        // Create connection
        conn = await pool.getConnection();
        console.log('Connected to MariaDB!');
        
        // Execute SQL query
        rows = await conn.query(sqlCommand, function (err, result) {
            if (err) throw err;
            console.log("Database created");
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

CREATE TABLE IF NOT EXISTS Tarifdaten (Tarifname VARCHAR(255), PLZ INTEGER(5), Fixkosten VARCHAR(50), VariableKosten VARCHAR(255)); 
`;


module.exports = provideDatabase;