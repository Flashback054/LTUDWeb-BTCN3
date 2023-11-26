const pgp = require("pg-promise")();

let db = pgp({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
});

const databaseName = process.env.DB_DB;
db.oneOrNone("SELECT datname FROM pg_database WHERE datname = $1", [
	databaseName,
]).then(async (database) => {
	if (!database) {
		console.log("Creating database");
		// Create the database
		await db.none("CREATE DATABASE $1:name", [databaseName]);
		// Reconnect to the new database
		db = pgp({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PW,
			database: process.env.DB_DB,
		});
		const populateDatabase = require("./populateDatabase.js");
		await populateDatabase(db);
		console.log("Database created and populated");
	} else {
		console.log("Database exists");
		db = pgp({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PW,
			database: process.env.DB_DB,
		});
	}
});

module.exports = db;
