import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
//import { BrowserRouter as Router } from 'react-router-dom';
//import { Provider } from 'react-redux';
import './index.css';
//import App from './components/app';

import { configureClient } from './api/client';
import storage from './utils/storage';
import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({ preloadedState: { auth: !!accessToken } });
console.log(store.getState());

ReactDOM.render(
	// <Provider store={store}>
	// 	<Router>
	// 		<App />
	// 	</Router>
	// </Provider>
	<Root store={store} />,
	document.getElementById('root')
);
