import { createWritableStore } from "$lib/helpers/storage"
import { get } from "svelte/store";
import { OfferType } from '$lib/contracts/Marketplace';

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

export function formHanlders(event) {
    let eventName = event.detail.name;
    switch (eventName) {
        case 'offerCreated':
            updateOffer(event.detail.offer);
            break;
        case 'offerModifyed':
            updateOffer(event.detail.offer);
            break;
        case 'offerRemoved':
            if (event.detail.offerType == OfferType.ForSale) {
                deleteSellStorage();
            } else {
                deleteRentStorage();
            }
            break;
        case 'buyed':
            setNoOffer(true, account);
            break;
        case 'rented':
            setNoOffer(true, account);
            break;
    }
}
// HANDLE OFFERS OWNER FUNCTION
function updateOffer(offer) {
    if (offer.offerType == OfferType.ForSale) {
        updateSellStorage(offer);
    } else {
        updateRentStorage(offer);
    }
}

function deleteSellStorage() {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = false;
    currentOffer.sellOffer = null;
    singleOffer.set(currentOffer);
}

function deleteRentStorage() {
    let currentOffer = get(singleOffer);
    currentOffer.isForRent = false;
    currentOffer.rentOffer = null;
    singleOffer.set(currentOffer);
}

function updateSellStorage(offer) {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = true;
    currentOffer.sellOffer = offer;
    singleOffer.set(currentOffer);
}

function updateRentStorage(offer) {
    let currentOffer = get(singleOffer);
    currentOffer.isForRent = true;
    currentOffer.rentOffer = offer;
    currentOffer.rentTerms = offer.rentTerms;
    singleOffer.set(currentOffer);
}

function setNoOffer(isOwner, account) {
    let currentOffer = get(singleOffer);
    currentOffer.isForSale = false;
    currentOffer.isForRent = false;
    if (isOwner) {
        currentOffer.isOwner = true;
        currentOffer.owner = account
    }
    singleOffer.set(currentOffer);
}
