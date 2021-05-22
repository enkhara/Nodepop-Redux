import { createStore } from 'redux';

import reducer from './reducer';

const configureStore = (preloadedState) => {
	const store = createStore(reducer, preloadedState);
	return store;
};

export default configureStore;
