import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

//convert isbns to 13 char format
const isbnToText = (isbn) => {
	if (isbn.length === 10) {
		return '978-' + isbn.substring(0, 1) + '-' + isbn.substring(1, 3) + '-' + isbn.substring(3, 9) + '-' + isbn.substring(9);
	} else if (isbn.length === 13) {
		return isbn.substring(0, 3) + '-' + isbn.substring(3, 4) + '-' + isbn.substring(4, 6) + '-' + isbn.substring(6, 12) + '-' + isbn.substring(12);
	} else return '(isbn error)';
}

const BooksListItem = ({ book, update, updateBook }) => {

	const onEditButton = () => {
		if (book.mode === 0) {
			updateBook('mode', 1);
		} else if (book.mode === 1) {
			axios.put(
				'/books',
				{
					author: book.author,
					name: book.name,
					year: book.year,
					isbn: book.isbn
				})
				.then(res => updateBook('mode', 0))
				.catch(err => { console.log(err) })
			updateBook('mode', 2);
		}
	}

	const onDeleteButton = () => {
		axios.delete('/books/' + book.isbn)
			.then(() => {
				update();
			})
			.catch(err => {
				console.log(err);
				updateBook('deleting', false);
			});
			updateBook('deleting', true);
	}

	const controlStyle = book.mode === 0 ? { backgroundColor: 'white', border: 'none', padding: '0' } : book.mode === 2 ? { backgroundColor: 'white', border: 'none', padding: '0' } : {};

	return (
		<ListGroupItem as='li'>
			<Form className='d-flex justify-content-between align-items-start'>
				<div>
					<Form.Control readOnly={book.mode === 0} style={{ overflowWrap: 'normal', width: '400px', ...controlStyle }} onChange={event => updateBook('name', event.target.value)} className='fw-bold' value={book.name} />
					<Form.Control readOnly={book.mode === 0} style={{ fontSize: 'small', ...controlStyle }} onChange={event => updateBook('author', event.target.value)} value={book.author} />
				</div>
				<div className='d-flex justify-content-between' style={{ 'width': '200px' }}>
					<div className='mr-3' >
						<Form.Control type='number' readOnly={book.mode === 0} style={controlStyle} onChange={event => updateBook('year', event.target.value)} value={book.year} />
						<div style={{ 'fontSize': 'small' }}>{isbnToText(book.isbn)}</div>
					</div>
					<div className='d-flex flex-column'>
						<Button size='sm' disabled={book.mode === 2} onClick={onEditButton}>{book.mode === 0 ? 'Edit' : book.mode === 1 ? 'Finish' : <Spinner animation='border' size='sm' />}</Button>
						<Button variant='dark' size='sm' onClick={onDeleteButton}>{book.deleting ? <Spinner animation='border' size='sm' /> : 'Delete'}</Button>
					</div>
				</div>
			</Form>
		</ListGroupItem>
	);
};

export default BooksListItem