import BootstrapLink from '../components/UI/BootstrapLink';
import Card from 'react-bootstrap/Card';

import BooksList from "../components/BooksList/BooksList";

const BookListPage = () => (
	<Card className="container-md mt-5 p-3 h-50" style={{ minWidth: '600px' }}>
		<BootstrapLink to='new' className='w-25 m-auto mb-3'>Add New Book</BootstrapLink>
		<BooksList />
	</Card>
);

export default BookListPage;