const Sonnenstrahl = require("../db").getConnectionSonnenstrahl;

/*const showTables = exports.showTables = async () => {
    try{
        let rows;
        let ZipCode = document.getElementById('zip');
        let consumption = document.getElementById('consump');
        const conn = await Sonnenstrahl();
        rows = conn.query('SELECT RateName, FixedCosts, ZipCode, VariableCosts, FixedCosts + VariableCosts * ? AS MonthlyCosts FROM RateData WHERE ZipCode LIKE ? AND Status = "active";',
        [consumption, ZipCode],
        (err, result) => {
            if (err) throw err;
            console.log(result);
     });
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end;
    }

}*/


console.log('hello');
console.log(document.getElementByName('consump'));
