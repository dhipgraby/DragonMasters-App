import { createWritableStore } from "$lib/helpers/storage"

const expirationTime = new Date().getTime() + 1000 * 60; //1 minute 

export const lendedEggs = createWritableStore('lendedEggs', [],expirationTime)
export const lendedDragons = createWritableStore('lendedDragons', [],expirationTime)
export const borrowedEggs = createWritableStore('borrowedEggs', [],expirationTime)
export const borrowedDragons = createWritableStore('borrowedDragons', [],expirationTime)