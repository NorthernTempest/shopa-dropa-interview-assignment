import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import isbn from 'isbn3';

import BootstrapLink from '../components/UI/BootstrapLink';
import { useNavigate } from 'react-router-dom';

const defaultFields = {
	author: '',
	name: '',
	isbn: '',
	year: 2000
}

const AddBookPage = () => {

	const [fields, setFields] = useState(defaultFields);
	const [isISBNValid, setISBNValid] = useState(false);
	const [message, setMessage] = useState(null);

	const navigate = useNavigate();

	const onUpdate = (event, type) => {
		const newFields = { ...fields };
		newFields[type] = event.target.value;
		setFields(newFields);
	}

	const onSubmit = () => {
		setMessage(null);
		axios.post('/books', fields).then(res => {
			navigate('/')
		}).catch(err => {
			setMessage('A book with that ISBN is already listed');
		});
	}

	useEffect(() => {
		let parsedIsbn = isbn.parse(fields.isbn);
		setISBNValid(!!parsedIsbn ? parsedIsbn.isValid : false);
	}, [fields.isbn])

	return (
		<Card className='container-md mt-5 p-3'>
			<h3>Enter the new book's information</h3>
			<Form>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' value={fields.name} onChange={event => onUpdate(event, 'name')} autoFocus/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='author'>
					<Form.Label>Author</Form.Label>
					<Form.Control type='text' value={fields.author} onChange={event => onUpdate(event, 'author')} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='isbn'>
					<Form.Label>ISBN</Form.Label>
					<Form.Control type='text' value={fields.isbn} onChange={event => onUpdate(event, 'isbn')} isInvalid={!isISBNValid} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='isbn'>
					<Form.Label>Year of publication</Form.Label>
					<Form.Control type='number' value={fields.year} onChange={event => onUpdate(event, 'year')} step='1' />
				</Form.Group>
				<div className='d-flex flex-row justify-content-between'>
					<Button to='/' onClick={onSubmit} disabled={!isISBNValid || fields.author.length < 1 || fields.name.length < 1}>Save</Button>
					<BootstrapLink variant='secondary' to='/'>Cancel</BootstrapLink>
				</div>{
					!!message ? (<Alert variant='danger' className='mt-3' onClose={() => setMessage(null)} dismissible>{message}</Alert>) : null
				}
			</Form>
		</Card>
	);
}

export default AddBookPage;