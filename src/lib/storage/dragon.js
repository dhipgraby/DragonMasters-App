import { createWritableStore } from '$lib/helpers/storage'
import { get, writable } from "svelte/store";

const expirationTime = new Date().getTime() + 1000 * 60; //1 minute 
//ALL DRAGONS
export const userDragons = createWritableStore('userDragons', [],expirationTime)
//FOR BREEDING
export const dragonA = createWritableStore('dragonA', 0);
export const dragonB = createWritableStore('dragonB', 0);
export const dragonApproval = writable(false)
//SINGLE DRAGON 
export const singleDragon = createWritableStore('singleDragon',0);

export function update_current_dragon(dragon, _gender) {
    //UPDATE DRAGON FOR BREEDING    
    dragon.gender = _gender
    if (_gender == 'dad') {
        dragonA.set(dragon);
    }
    if (_gender == 'mum') {
        dragonB.set(dragon);
    }
}

export function remove_current_dragon(dragon, _gender) {
    //UPDATE DRAGON FOR BREEDING    
    dragon.gender = _gender
    if (_gender == 'dad') {
        dragonA.set([]);
    }
    if (_gender == 'mum') {
        dragonB.set([]);
    }
}

export async function updateSingle(dragon) {

    let dragons = get(userDragons)

    let updated = dragons.map((elem) => {
        if (elem.tokenId == dragon.tokenId) elem = dragon
        return elem
    })

    userDragons.set(updated);
}
