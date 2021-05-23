import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';

export default function Root({ store }) {
	return (
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	);
}
