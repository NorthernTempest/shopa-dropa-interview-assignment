// import node express
const express = require('express');
const router = express.Router();

const books = [];

/* GET books listing. */
router.get('/', function (req, res, next) {
	res.json({ data: books });
});

router.post('/', (req, res, next) => {
	const isbn = req.get('isbn');
	const del = req.get('del');

	const book = books.find(book => book.isbn === isbn)

	if( !!del ) {

		if( !!book ) {
			const index = books.indexOf(book);
			books.slice(index, index + 1);
		}
		
	} else {
		const author = req.get('author');
		const name = req.get('name');
		const year = req.get('yearOfPublishing');
	
		if(!!book) {
			books[books.indexOf(book)] = {author: author, name: name, year: year, isbn: isbn };
		} else {
			books.push({ author: author, name: name, year: year, isbn: isbn });
		}
	}
});

module.exports =  router;
