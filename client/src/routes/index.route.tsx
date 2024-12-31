import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Item from '../pages/Item';
import Home from '../pages/Home';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/item" element={<Item />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
