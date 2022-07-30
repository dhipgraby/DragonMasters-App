import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
    const interval = setInterval(callback, milliseconds);

    onDestroy(() => {
        clearInterval(interval);
    });
}

export const Maturity = {
    Hatchling: 0,
    Adolescent: 1,
    YoungAdult: 2,
    MatureAdult: 3,
    Senior: 4,
    Ancient: 5,
    Immortal: 6
}

const SubSpecies = {
    Earth: 0,
    Fire: 1,
    Air: 2,
    Water: 3
}

export const Attribute = {
    Strength:0,
    Endurance:1,
    Agility:2,
    Charisma:3,
    Intelligence:4,
    Wisdom:5
}

export const Skill = {
    Attack:0,
    Defend:1,
    Run:2,
    Climb:3,
    Jump:4,
    Fly:5,
    Swim:6,
    Dig:7
}

const dayInSeconds = 86400

Object.freeze(Maturity)
Object.freeze(SubSpecies)
Object.freeze(Attribute)
Object.freeze(Skill)

export function subSpeciesName(SubSpecies) {

    SubSpecies = SubSpecies.toString()
    let speciesName = ""

    switch (SubSpecies) {
        case "0":
            speciesName = 'Earth'
            break;
        case "1":
            speciesName = 'Fire'
            break;
        case "2":
            speciesName = 'Air'
            break;
        case "3":
            speciesName = 'Water'
            break;
    }
    return speciesName
}


export function shortAddr(address) {
    var firstPart = address.substr(0, 6);
    var secondPart = address.substr(38, 4);
    var userAddr = firstPart + "...." + secondPart

    return userAddr;
}

//ether to wei
export const getWei = async (value) => { 
    if(typeof value != 'string') value = String(value)   
    let res = await web3.utils.toWei(value)
    return res
}

//Wei to ether
export const getEth = async (value) => {    
    if(typeof value != 'string') value = String(value)
    let res = await web3.utils.fromWei(value)
    return res
}

export const timeDropdrown = {    
    oneDay:dayInSeconds,
    twoDays:dayInSeconds * 2,
    threeDays:dayInSeconds * 3,                
    week:dayInSeconds * 7,
    twoWeeks:dayInSeconds * 14,
    month:dayInSeconds * 30,
    twoMonths:dayInSeconds * 60,
    oneYear:dayInSeconds * 365
}
