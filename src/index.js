import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({ preloadedState: { auth: !!accessToken } });
console.log(store.getState());

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App isInitiallyLogged={!!accessToken} />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
