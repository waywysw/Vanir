import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, redirect } from 'react-router-dom';
import NavBar from '../components/shared/NavBar';

function ScrollToTop() {
	const location = useLocation();
  
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);
  
	return null; // this component does not render anything
}

export default function App(){
    return (
		<div id='App'>
			<Router>
				<ScrollToTop />
                <NavBar />
				<div className='main-content mb-[64px] md:mb-0'>
					<Routes>
                        <Route path='/*' element={<Navigate to='/home' />} />
					</Routes>
				</div>
			</Router>
		</div>
    );
};