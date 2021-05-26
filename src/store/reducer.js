import { combineReducers } from 'redux';

import {
	ADVERTS_LOADED,
	ADVERT_CREATED,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	UI_RESET_ERROR,
} from './types';

const initialState = {
	auth: false,
	adverts: [],
	ui: {
		loading: false,
		error: null,
	},
};

// function reducer(state = initialState, action) {
// 	switch (action.type) {
// 		case AUTH_LOGIN:
// 			return { ...state, auth: true };
// 		case AUTH_LOGOUT:
// 			return { ...state, auth: false };
// 		case ADVERTS_LOADED:
// 			return { ...state, adverts: action.payload.adverts };
// 		case ADVERT_CREATED:
// 			return { ...state, adverts: state.adverts.concat(action.payload.advert) };
// 		default:
// 			return state;
// 	}
// }

export function auth(state = initialState.auth, action) {
	switch (action.type) {
		case AUTH_LOGIN_SUCCESS:
			return true;
		case AUTH_LOGOUT:
			return false;
		default:
			return state;
	}
}

export function adverts(state = initialState.adverts, action) {
	switch (action.type) {
		case ADVERTS_LOADED:
			return action.payload.adverts;
		case ADVERT_CREATED:
			return state.adverts.concat(action.payload.advert);
		default:
			return state;
	}
}
export function ui(state = initialState.ui, action) {
	if (action.error) {
		return { ...state, loading: false, error: action.payload };
	}
	switch (action.type) {
		case AUTH_LOGIN_REQUEST:
			return { ...state, loading: true, error: null };
		case AUTH_LOGIN_SUCCESS:
			return { ...state, loading: false };
		case AUTH_LOGIN_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case UI_RESET_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
}

// function reducer(state = initialState, action) {
// 	return {
// 		auth: auth(state.auth, action),
// 		adverts: adverts(state.adverts, action),
// 	};
// }

const reducer = combineReducers({
	auth,
	adverts,
	ui,
});

export default reducer;
