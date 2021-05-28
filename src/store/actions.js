import { getAdvertsLoaded, getTagsLoaded } from './selectors';
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
	ADVERT_DELETED_REQUEST,
	ADVERT_DELETED_SUCCESS,
	ADVERT_DELETED_FAILURE,
	TAGS_LOADED_REQUEST,
	TAGS_LOADED_SUCCESS,
	TAGS_LOADED_FAILURE,
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
	//console.log('ACTION ADVERTSLOADEDSUCCESS', adverts);
	return {
		type: ADVERTS_LOADED_SUCCESS,
		payload: adverts,
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
		//console.log('hello state', getState());
		const advertsLoaded = getAdvertsLoaded(getState());
		if (advertsLoaded) {
			return;
		}
		dispatch(advertsLoadedRequest());
		try {
			const adverts = await api.adverts.getAllAdverts();
			dispatch(advertsLoadedSuccess(adverts));
			//console.log('actions line 91 error', adverts);
		} catch (error) {
			//TODO: pasarle el history y manejar en caso de rror la redireccion para quitarla del componente
			dispatch(advertsLoadedFailure(error));
		}
	};
};

/*******************************TAGS*********************************** */
export const tagsLoadedRequest = () => {
	return {
		type: TAGS_LOADED_REQUEST,
	};
};

export const tagsLoadedSuccess = (tags) => {
	console.log('ACTION TAGSLOADEDSUCCESS', tags);
	return {
		type: TAGS_LOADED_SUCCESS,
		payload: tags,
	};
};

export const tagsLoadedFailure = (error) => {
	return {
		type: TAGS_LOADED_FAILURE,
		payload: error,
		error: true,
	};
};

export const tagsLoadedAction = () => {
	return async function (dispatch, getState, { api }) {
		console.log('hello state tags', getState());
		const tagsLoaded = getTagsLoaded(getState());
		console.log('tagsloaded', tagsLoaded);
		if (tagsLoaded) {
			return;
		}
		dispatch(tagsLoadedRequest());
		try {
			console.log('entrando en el try');
			const tags = await api.adverts.getAllTags();
			console.log('API CALL TAGS', tags);
			dispatch(tagsLoadedSuccess(tags));
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
		payload: advert,
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
	return async function (dispatch, getState, { api, history }) {
		//console.log('hello state', getState());

		dispatch(advertCreatedRequest());
		try {
			const { id: advertId } = await api.adverts.createdAdvert(advert);
			//console.log('1', advert);
			const createdAdvert = await api.adverts.getAdvert(advertId);
			//console.log('2', advertId);
			//console.log('3', createdAdvert);
			dispatch(advertCreatedSuccess(createdAdvert));
			history.push(`/adverts/${advertId}`);
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
