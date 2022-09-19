import { createWritableStore } from '$lib/helpers/storage'
import { get, writable } from "svelte/store";
//ALL DRAGONS
export const userDragons = createWritableStore('userDragons',[])
//FOR BREEDING
export const dragonA = createWritableStore('dragonA',0);
export const dragonB = createWritableStore('dragonB',0);
export const dragonApproval = writable(false)

export function update_current_dragon(dragon,_gender){
//UPDATE DRAGON FOR BREEDING    
    dragon.gender = _gender
    if(_gender == 'dad'){
        dragonA.set(dragon);   
    }

    if(_gender == 'mum'){
        dragonB.set(dragon); 
    }       
}

export async function updateSingle(dragon){

    let dragons = get(userDragons)

    let updated = dragons.map((elem) => {
        if(elem.tokenId == dragon.tokenId) elem = dragon
            return elem
    } )

    userDragons.set(updated);   
}
