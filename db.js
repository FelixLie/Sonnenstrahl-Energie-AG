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


// SQL query (Create Database + Tables)
var sqlCommand = `
CREATE DATABASE IF NOT EXISTS Sonnenstrahl_Energie_AG;

USE Sonnenstrahl_Energie_AG;

CREATE TABLE IF NOT EXISTS Tarifdaten (Tarifname VARCHAR(255), PLZ INTEGER(5), Fixkosten FLOAT(9,2), VariableKosten FLOAT(9,4),Tarif_Id INTEGER PRIMARY KEY AUTO_INCREMENT); 
`;

//LOAD DATA LOCAL INFILE 'sources.csv' INTO TABLE Tarifdaten FIELDS TERMINATED BY ';' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (Tarifname,PLZ,Fixkosten,VariableKosten,Tarif_Id);

module.exports = provideDatabase;