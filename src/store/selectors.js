export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
	state.adverts.data.sort((advert1, advert2) => {
		if (advert1.createdAt < advert2.createdAt) return 1;
		return -1;
	});

export const getAdvertsLoaded = (state) => {
	return state.adverts.loaded;
};

export const getTags = (state) => state.tags;

export const getTagsLoaded = (state) => !!state.tags.length;

export const getUi = (state) => {
	return state.ui;
};

export const getAdvertDetail = (state, advertId) => {
	return state.adverts.data.find((advert) => advert.id === advertId);
};
