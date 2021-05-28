import { getAdvertsLoaded } from './selectors';
import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	ADVERTS_LOADED_REQUEST,
	ADVERTS_LOADED_SUCCESS,
	ADVERTS_LOADED_FAILURE,
	UI_RESET_ERROR,
	ADVERT_CREATED_SUCCESS,
	ADVERT_CREATED_REQUEST,
	ADVERT_CREATED_FAILURE,
} from './types';

/*************************LOGIN************************************** */
export const authLoginRequest = () => {
	return {
		type: AUTH_LOGIN_REQUEST,
	};
};

export const authLoginSuccess = () => {
	return {
		type: AUTH_LOGIN_SUCCESS,
	};
};

export const authLoginFailure = (error) => {
	return {
		type: AUTH_LOGIN_FAILURE,
		payload: error,
		error: true,
	};
};

export const loginAction = (credentials) => {
	return async function (dispatch, getState, { api, history }) {
		dispatch(authLoginRequest());
		try {
			await api.auth.login(credentials);
			dispatch(authLoginSuccess());

			const { from } = history.location.state || { from: { pathname: '/' } };
			history.replace(from);
		} catch (error) {
			dispatch(authLoginFailure(error));
		}
	};
};

export const authLogout = () => {
	return {
		type: AUTH_LOGOUT,
	};
};
/*************************ADVERTS********************** */
export const advertsLoadedRequest = () => {
	return {
		type: ADVERTS_LOADED_REQUEST,
	};
};

export const advertsLoadedSuccess = (adverts) => {
	return {
		type: ADVERTS_LOADED_SUCCESS,
		payload: {
			adverts,
		},
	};
};

export const advertsLoadedFailure = (error) => {
	return {
		type: ADVERTS_LOADED_FAILURE,
		payload: error,
		error: true,
	};
};

export const advertsLoadedAction = () => {
	return async function (dispatch, getState, { api }) {
		console.log('hello state', getState());
		const advertsLoaded = getAdvertsLoaded(getState());
		if (advertsLoaded) {
			return;
		}
		dispatch(advertsLoadedRequest());
		try {
			const adverts = await api.adverts.getAllAdverts();
			dispatch(advertsLoadedSuccess(adverts));
			console.log('actions line 91 error', adverts);
		} catch (error) {
			//TODO: pasarle el history y manejar en caso de rror la redireccion para quitarla del componente
			dispatch(advertsLoadedFailure(error));
		}
	};
};

/**************************ADVERT CREATION***************************** */

export const advertCreatedRequest = () => {
	return {
		type: ADVERT_CREATED_REQUEST,
	};
};

export const advertCreatedSuccess = (advert) => {
	return {
		type: ADVERT_CREATED_SUCCESS,
		payload: {
			advert,
		},
	};
};

export const advertCreatedFailure = (error) => {
	return {
		type: ADVERT_CREATED_FAILURE,
		payload: error,
		error: true,
	};
};

export const advertCreatedAction = (advert) => {
	return async function (dispatch, getState, { api }) {
		console.log('hello state', getState());

		dispatch(advertCreatedRequest());
		try {
			const createdAdvert = await api.adverts.createdAdvert(advert);
			dispatch(advertCreatedSuccess(createdAdvert));
		} catch (error) {
			dispatch(advertCreatedFailure(error));
		}
	};
};

/**********************ERROR*************************** */
export const resetError = () => {
	return {
		type: UI_RESET_ERROR,
	};
};
