export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts;
//TODO: afegir en el selector de getAdverts la lógica  per pintar els anuncis per ordre ascendent de data de creació

export const getUi = (state) => state.ui;
