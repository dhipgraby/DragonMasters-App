import { createWritableStore } from '$lib/helpers/storage'
import { get } from "svelte/store";
//FOR BREEDING
export const dragonA = createWritableStore('dragonA',0);
export const dragonB = createWritableStore('dragonB',0);
export const userDragons = createWritableStore('userDragons',[])

export function update_current_dragon(dragon,_gender){
    
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

export function offer_format(dragon){

    const dragonObj = {
        id: dragon.id,
        dna: dragon.dna,
        gen: dragon.generation,
        mumId:dragon.mumId,
        dadId:dragon.dadId,
        single:true,
        displayOffer:true,
        displayDna:true,
        displayInfo:false,
        displayAttributes:false,
    };

    return dragonObj

}

export function user_format(dragon){
    
    const dragonObj = {
        id: dragon.id,
        dna: dragon.dna,
        gen: dragon.gen,
        offer: dragon.offer,
        isApproved:dragon.isApproved,        
        isOwner : true,	
        displayDna:true,
        displayInfo:true,
        displayAttributes:true,
    };

    return dragonObj

}

export function marketplace_format(dragon) {

    const dragonObj = {
        id: dragon.tokenId,
        dna: dragon.dna,
        gen: dragon.generation,
        displayDna: true,
        displayInfo: true,
        displayAttributes: true,
    };

    return dragonObj;
}
