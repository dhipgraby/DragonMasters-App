import { createWritableStore } from "$lib/helpers/storage"

const expirationTime = new Date().getTime() + 1000 * 60; //1 minute 
//ITEMS FOR SALE STORAGE
export const dragonsForSale = createWritableStore('dragonsForSale', [],expirationTime);
export const eggsForSale = createWritableStore('eggsForSale', [],expirationTime);
//ITEMS FOR RENT STORAGE
export const dragonsForRent = createWritableStore('dragonsForRent', [],expirationTime);
export const eggsForRent = createWritableStore('eggsForrRent', [],expirationTime);

export const userOffers = createWritableStore('userOffers', { eggs: [], dragons: [] },expirationTime);

