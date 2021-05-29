export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
	//console.log('estado que llega al selector getAdverts', state);
	state.adverts.data.sort((advert1, advert2) => {
		if (advert1.createdAt < advert2.createdAt) return 1;
		return -1;
	});

export const getAdvertsLoaded = (state) => {
	console.log('getAdverts', state);
	return state.adverts.loaded;
};
//TODO: afegir en el selector de getAdverts la lógica  per pintar els anuncis per ordre ascendent de data de creació

export const getTags = (state) => state.tags;

export const getTagsLoaded = (state) => !!state.tags.length;

export const getUi = (state) => {
	console.log('state en GETUI', state);
	return state.ui;
};

export const getAdvertDetail = (state, advertId) => {
	console.log(advertId, state);
	return state.adverts.data.find((advert) => advert.id === advertId);
};

// export const deleteAdvert = (state, advert) => {
// 	return state.adverts.data.filter((adverts) => adverts !== advert);
// };
