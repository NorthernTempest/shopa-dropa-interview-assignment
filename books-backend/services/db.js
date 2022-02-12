const Pool = require('pg').Pool;
const config = require('../config');

const pool = new Pool(config.db);

const dbSchema = {
	tables: [
		{
			name: 'books',
			fields: [
				{
					name: 'name',
					dataType: 'varchar(64)'
				},
				{
					name: 'author',
					dataType: 'varchar(32)',
				},
				{
					name: 'year',
					dataType: 'smallint',
				},
				{
					name: 'isbn',
					dataType: 'char(13)',
					primaryKey: true,
					default: true
				}
			]
		}
	]
};

// Create Table
const createTable = async function () {
	const query = 'CREATE TABLE IF NOT EXISTS books (name varchar(64), author varchar(32), year smallint, isbn char(13) PRIMARY KEY);';
	return pool.query(query);
};

const getBooks = (onSuccess, onFail) => {
	const query = 'SELECT * FROM books ORDER BY name ASC;';
	pool.query(query, (err, results) => {
		if (!!err) onFail(err);
		else onSuccess(results.rows);
	});
};

const getBookByIsbn = (isbn, onSuccess, onFail) => {
	const query = 'SELECT * FROM books WHERE isbn = $1;';
	pool.query(query, [isbn], (err, results) => {
		if (!!err) onFail(err);
		else onSuccess(results.rows[0]);
	});
}

const createBook = ({ isbn, name, author, year }, onSuccess, onFail) => {
	const query = 'INSERT INTO books (isbn, name, author, year) VALUES ($1, $2, $3, $4);';
	pool.query(query, [isbn, name, author, year], (err, results) => {
		if (!!err) onFail(err);
		else onSuccess(results.rows);
	});
}

const updateBook = ({ isbn, name, author, year }, onSuccess, onFail) => {
	const query = 'UPDATE books SET name = $2, author = $3, year = $4 WHERE isbn = $1;';
	pool.query(query, [isbn, name, author, year], (err, results) => {
		if (!!err) onFail(err);
		else onSuccess(results.rows);
	});
}

const deleteBook = (isbn, onSuccess, onFail) => {
	const query = 'DELETE FROM books WHERE isbn = $1';
	pool.query(query, [isbn], (err, results) => {
		if (!!err) onFail(err);
		else onSuccess(results);
	});
}

module.exports = {
	dbSchema,
	pool,
	createTable,
	getBooks,
	getBookByIsbn,
	createBook,
	updateBook,
	deleteBook
};