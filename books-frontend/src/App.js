import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BookListPage from './pages/BookListPage';
import AddBookPage from './pages/AddBookPage';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" exact element={<BookListPage/>} />
					<Route path="/new" exact element={<AddBookPage/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
