import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Spinner from './components/Spinner';

import Footers from './components/Footers';
import Login from './pages/Login';
import { fetchUser } from './utils/fetchUser';

const Home = lazy(() => import('./container/Home'));

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const user = fetchUser();
		if (!user) {
			navigate('/login');
		}
	}, []);

	// Make scrollbar red
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{/* Display the containers */}
				<Route path="/login" element={<Login />} />
				<Route path="/*" element={<Home />} />
			</Routes>
		</Suspense>
	);
}

export default App;
