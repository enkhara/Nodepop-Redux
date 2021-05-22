import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const configureStore = ({ preloadedState }) => {
	const store = createStore(reducer, preloadedState, composeWithDevTools());
	return store;
};

export default configureStore;
