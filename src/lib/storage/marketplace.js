import { createWritableStore } from "$lib/helpers/storage"

//ITEMS FOR SALE STORAGE
export const dragonsForSale = createWritableStore('dragonsForSale', []);
export const eggsForSale = createWritableStore('eggsForSale', []);
//ITEMS FOR RENT STORAGE
export const dragonsForRent = createWritableStore('dragonsForRent', []);
export const eggsForRent = createWritableStore('eggsForrRent', []);

export const userOffers = createWritableStore('userOffers', { eggs: [], dragons: [] });

