import { createWritableStore } from "$lib/helpers/storage"
import { get } from "svelte/store";

const expirationTime = new Date().getTime() + 1000 * 60; //1 minute 
//ITEMS FOR SALE STORAGE
export const dragonsForSale = createWritableStore('dragonsForSale', [], expirationTime);
export const eggsForSale = createWritableStore('eggsForSale', [], expirationTime);
//ITEMS FOR RENT STORAGE
export const dragonsForRent = createWritableStore('dragonsForRent', [], expirationTime);
export const eggsForRent = createWritableStore('eggsForrRent', [], expirationTime);
export const userOffers = createWritableStore('userOffers', { eggs: [], dragons: [] }, expirationTime);
//SINGLE OFFER
export const singleOffer = createWritableStore('singleoffer', 0);

export function deleteSellStorage() {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = false;
    currentOffer.sellOffer = null;
    singleOffer.set(currentOffer);
}

export function deleteRentStorage() {
    let currentOffer = get(singleOffer);
    currentOffer.isForRent = false;
    currentOffer.rentOffer = null;
    singleOffer.set(currentOffer);
}

export function updateSellStorage(offer) {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = true;
    currentOffer.sellOffer = offer;
    singleOffer.set(currentOffer);
}

export function updateRentStorage(offer) {
    let currentOffer = get(singleOffer);
    currentOffer.isForRent = true;
    currentOffer.rentOffer = offer;
    currentOffer.rentTerms = offer.rentTerms;
    singleOffer.set(currentOffer);
}

export function setNoOffer(isOwner, account) {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = false;
    currentOffer.isForRent = false;
    if (isOwner) {
        currentOffer.isOwner = true;
        currentOffer.owner = account
    }
    singleOffer.set(currentOffer);
}
