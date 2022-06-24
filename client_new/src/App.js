import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import { StoreProvider } from 'easy-peasy'
import  store  from './Store/index'

function App() {
return (
	<StoreProvider store={store}>
	<Router>
		<Navbar />
		<Routes>
			<Route exact path='/' element={<Home />} />
			<Route path='/about' element={<About/>} />
			<Route path='/contact' element={<Contact/>} />
			<Route path='/blogs' element={<Blogs/>} />
			<Route path='/sign-up' element={<SignUp/>} />
		</Routes>
		</Router>
	</StoreProvider>
);
}

export default App;
