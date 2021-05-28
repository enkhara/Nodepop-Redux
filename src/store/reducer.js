import { combineReducers } from 'redux';

import {
	ADVERTS_LOADED_REQUEST,
	ADVERTS_LOADED_SUCCESS,
	ADVERT_CREATED_SUCCESS,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	TAGS_LOADED_REQUEST,
	TAGS_LOADED_SUCCESS,
	TAGS_LOADED_FAILURE,
	ADVERT_DETAIL_REQUEST,
	ADVERT_DETAIL_SUCCESS,
	ADVERT_DETAIL_FAILURE,
	UI_RESET_ERROR,
} from './types';

const initialState = {
	auth: false,
	adverts: {
		loaded: false,
		data: [],
	},
	tags: [],
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
	//console.log('en auth reducer', state);
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
	//console.log('en advert reducer', state);
	switch (action.type) {
		case ADVERTS_LOADED_SUCCESS:
			return { ...state, loaded: true, data: action.payload };
		case ADVERT_CREATED_SUCCESS:
		case ADVERT_DETAIL_SUCCESS:
			return {
				...state,
				loaded: false,
				data: [...state.data, action.payload],
			};
		default:
			return state;
	}
}

export function tags(state = initialState.tags, action) {
	//console.log('en tags reducer', state);
	switch (action.type) {
		case TAGS_LOADED_SUCCESS:
			return { ...state, tags: action.payload };
		default:
			return state;
	}
}

export function ui(state = initialState.ui, action) {
	//console.log('en ui reducer', state);
	if (action.error) {
		return { ...state, loading: false, error: action.payload };
	}
	switch (action.type) {
		case AUTH_LOGIN_REQUEST:
		case ADVERTS_LOADED_REQUEST:
		case TAGS_LOADED_REQUEST:
			return { ...state, loading: true, error: null };
		case AUTH_LOGIN_SUCCESS:
		case ADVERTS_LOADED_SUCCESS:
		case TAGS_LOADED_SUCCESS:
			return { ...state, loading: false };
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
	tags,
	ui,
});

export default reducer;
