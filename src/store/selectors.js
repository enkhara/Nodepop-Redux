export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
	//console.log('estado que llega al selector getAdverts', state);
	state.adverts.data.sort((advert1, advert2) => {
		if (advert1.createdAt < advert2.createdAt) return 1;
		return -1;
	});

export const getAdvertsLoaded = (state) => state.adverts.loaded;
//TODO: afegir en el selector de getAdverts la lógica  per pintar els anuncis per ordre ascendent de data de creació

export const getTags = (state) => state.tags;

export const getTagsLoaded = (state) => !!state.tags.length;

export const getUi = (state) => state.ui;
