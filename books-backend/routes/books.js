const db = require('../services/db');
const isbn = require('isbn3');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	db.createTable().then(result => {
		db.getBooks(rows => {
			res.json(rows);
		}, err => {
			console.log(err);
			res.status(500).send(err.toString());
		});
	}).catch(err => {
		console.log(err);
	});
});

router.get('/:isbn', (req, res, next) => {
	const parsed = isbn.parse(req.params.isbn);
	if (!parsed || !parsed.isValid) {
		res.status(406).send('invalid-isbn');
	} else {
		db.createTable().then(result => {
			db.getBookByIsbn(parsed.isbn13, rows => {
				res.json(rows[0]);
			}, err => {
				console.log(err);
				res.status(404).send('book-not-found');
			});
		}).catch(err => {
			console.log(err);
		});
	}
});

router.post('/', (req, res, next) => {
	const temp = {
		isbn: isbn.parse(req.body.isbn),
		author: req.body.author,
		name: req.body.name,
		year: req.body.year
	}
	if (!temp.isbn || !temp.isbn.isValid) {
		res.status(406).send('invalid-isbn');
	} else {
		temp.isbn = temp.isbn.isbn13;
		const callback = () => {
			db.createBook(temp, rows => {
				res.sendStatus(201);
			}, err => {
				console.log(err);
				res.status(500).send('database-error');
			})
		};
		db.createTable().then(
			result => db.getBookByIsbn(
				temp.isbn,
				rows => {
					if (rows && rows.length && rows.length > 0)
						res.status(409).send('duplicate-isbn');
					else callback();
				},
				callback
			)
		).catch(err => {
			console.log(err);
		});
	}
});

router.delete('/:isbn', (req, res, next) => {
	const parsed = isbn.parse(req.params.isbn);
	if (!parsed || !parsed.isValid) {
		res.status(406).send('invalid-isbn');
	} else {
		db.createTable().then(result => db.getBookByIsbn(parsed.isbn13, rows => {
			if (!!rows && rows.isbn === parsed.isbn13) {
				db.deleteBook(parsed.isbn13, rows => {
					res.sendStatus(200);
				}, err => {
					console.log(err);
					res.status(500).send('database-error');
				});
			}
			else res.status(404).send('book-not-found');
		}, err => {
			console.log(err);
			res.status(500).send('database-error');
		})).catch(err => {
			console.log(err);
		});
	}
});

router.put('/', (req, res, next) => {
	const temp = {
		isbn: isbn.parse(req.body.isbn),
		author: req.body.author,
		name: req.body.name,
		year: req.body.year
	}
	if (!temp.isbn || !temp.isbn.isValid) {
		res.status(406).send('invalid-isbn');
	} else {
		temp.isbn = temp.isbn.isbn13;

		db.createTable().then(result => db.getBookByIsbn(temp.isbn, rows => {
			if (!!rows && temp.isbn === rows.isbn) {
				db.updateBook(temp, rows => {
					res.sendStatus(200);
				}, err => {
					console.log(err);
					res.status(500).send('database-error');
				});
			} else {
				res.status(404).send('book-not-found');
			}
		}, err => {
			console.log(err);
			res.status(404).send('book-not-found');
		})).catch(err => {
			console.log(err);
		});
	}
});

module.exports = router;
