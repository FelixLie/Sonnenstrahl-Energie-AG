const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'SonnenstrahlAG',
    database: 'test',
});

async function dbAbruf() {
    let conn;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM dummy");
        console.log(rows);

    } catch (err) {
        throw err;

    } finally {
        if (conn) return conn.end();
    }
}

module.exports = dbAbruf;