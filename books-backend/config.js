require('dotenv').config();

const config = {
	db: {
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	}
}

module.exports = config;