const fs = require("fs");
const csv = require("fast-csv");
const getConnection = require("../db").getConnectionSonnenstrahl

// CSV import function
exports.importDATA = async () => {
	const connection = await getConnection();
	await connection.query('UPDATE ratedata SET status = "inactive";');
	fs.createReadStream('./CSV/sources.csv')
		.pipe(csv.parse({ delimiter: ";", renameHeaders: true, headers: ["name", "plz", "fprice", "vprice"] }))
		.on('error', error => console.error(error))
		.on('data', async (row) => {
			/**
			 * @type {{name: string, plz: string, fprice: string, vprice: string}}
			 */
			row;

			const { name, plz, fprice, vprice } = row;

			try {
				await connection.query(`
					INSERT INTO RateData
					(RateName, ZipCode, FixedCosts, VariableCosts, Status)
					VALUES (?,?,?,?, "active")`
					, [name, plz, Number(fprice.replace(",", ".")), Number(vprice.replace(",", "."))]
				);

			} catch (e) {
				console.log(e)
			}

			// Output imported data
			//console.log(`ROW=${JSON.stringify(row)}`)
		})
		.on('end', rowCount => console.log(`Parsed ${rowCount} rows`))
		.on("error", (err) => console.log(`err`))
	
}
