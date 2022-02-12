import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import BooksListItem from './BooksListItem';
import axios from 'axios';

const defaultBooks = [];

const BooksList = () => {
	const [books, setBooks] = useState(defaultBooks);

	const update = () => {
		axios.get('/books').then((res) => {
			const temp = res.data;
			temp.forEach(book => {
				book.mode = 0;
				book.deleting = false;
			});
			setBooks(temp);
		});
	}

	const updateBook = (index, field, value) => {
		const temp = [...books];
		temp[index][field] = value;
		setBooks(temp);
	}

	useEffect(update, []);
	if (books.length > 0) {
		return (<ListGroup as='ul'>
			{books.map((book, i) => {
				return <BooksListItem key={i} book={book} update={update} updateBook={(field, value) => updateBook(i, field, value)}/>
			})}
		</ListGroup>
		);
	}
	else {
		return null;
	}
};

export default BooksList;