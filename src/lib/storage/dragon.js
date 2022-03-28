
import { writable } from 'svelte/store';

//FOR BREEDING
export const dragonA = writable(0);
export const dragonB = writable(0);

export function update_current_dragon(dragon,_gender){
    
    dragon.gender = _gender
    if(_gender == 'dad'){
        dragonA.update(value => {
            value = dragon
            return value;
        });   
    }

    if(_gender == 'mum'){
        dragonB.update(value => {
            value = dragon
            return value;
        }); 
    }       
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
