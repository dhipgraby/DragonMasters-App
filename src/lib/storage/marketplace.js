import { createWritableStore } from "$lib/helpers/storage"
import { writable, derived, readable } from "svelte/store";

const OfferObj = {
    owner: '',
    tokenId: null,
    tokenType: null,
    sellPrice: null,
    rent: {
        price: null,
        deposit: null,
        minDuration: 0,
    }
}
//ITEMS FOR SALE STORAGE
export const dragonsForSale = createWritableStore('dragonsForSale', []);
export const eggsForSale = createWritableStore('eggsForSale', []);
//ITEMS FOR RENT STORAGE
export const dragonsForRent = createWritableStore('dragonsForRent', []);
export const eggsForRent = createWritableStore('eggsForrRent', []);

export const userOffers = createWritableStore('userOffers', { eggs: [], dragons: [] });

