import { createWritableStore } from "$lib/helpers/storage"

export const lendedEggs = createWritableStore('lendedEggs', [])
export const lendedDragons = createWritableStore('lendedDragons', [])
export const borrowedEggs = createWritableStore('borrowedEggs', [])
export const borrowedDragons = createWritableStore('borrowedDragons', [])