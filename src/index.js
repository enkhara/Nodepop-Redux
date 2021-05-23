import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';
import { authLogin, authLogout } from './store/actions';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({ preloadedState: { auth: !!accessToken } });
console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
