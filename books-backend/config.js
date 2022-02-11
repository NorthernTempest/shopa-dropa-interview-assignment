const env = process.env;

const config = {
	db: {
		host: env.PGHOST || 'localhost',
		port: env.PGPORT || '5432',
		user: env.PGUSER || 'shopa-dropa-books-user',
		password: env.PGPASSWORD || 'password',
		database: env.PGDATABASE || 'postgres',
	}
}

export default config