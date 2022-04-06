import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}

export const SubSpecies = {
    Unknown:0,
    Earth:1,
    Fire:2,
    Air:3,
    Water:4
}

export function subSpeciesName(SubSpecies){

    let speciesName = ""

    switch(SubSpecies){
        case "1" :
            speciesName = 'Earth'
        break;           
        case "2" :
            speciesName = 'Fire'
        break;           
        case "3" :
            speciesName = 'Air'
        break;             
        case "4" :
            speciesName = 'Water'
        break;           
    }
    return speciesName
}

