import { authLogin, authLogout } from './actions';
import { AUTH_LOGIN, AUTH_LOGOUT } from './types';

const initialState = {
	auth: false,
	//adverts: [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_LOGIN:
			return { ...state, auth: true };
		case AUTH_LOGOUT:
			return { ...state, auth: false };
		default:
			return state;
	}
}

export default reducer;
