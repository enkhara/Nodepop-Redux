import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import './index.css';

import { configureClient } from './api/client';
import storage from './utils/storage';
import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({ preloadedState: { auth: !!accessToken } });
console.log(store.getState());

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
