import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const middleware = [thunkMiddleware];

const configureStore = ({ preloadedState }) => {
	const store = createStore(
		reducer,
		preloadedState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
	return store;
};

export default configureStore;
