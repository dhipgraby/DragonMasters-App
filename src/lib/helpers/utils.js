import { OfferType } from '$lib/contracts/LoanBook';
import { onDestroy } from 'svelte';
import { contractsAbi } from '$lib/contracts/contractsAbi';

export function onInterval(callback, milliseconds) {
    const interval = setInterval(callback, milliseconds);

    onDestroy(() => {
        clearInterval(interval);
    });
}

export const Maturity = {
    Hatchling: 0,
    Juvenile: 1,
    Adult: 2,
    Veteran: 3,
    Elder: 4,
    Ancient: 5,
    Immortal: 6
}

const SubSpecies = {
    Earth: 0,
    Fire: 1,
    Air: 2,
    Water: 3
}

export const Attributes = {
    Strength: 0,
    Endurance: 1,
    Agility: 2,
    Charisma: 3,
    Intelligence: 4,
    Wisdom: 5
}

export const Skill = {
    Attack: 0,
    Defend: 1,
    Run: 2,
    Climb: 3,
    Jump: 4,
    Fly: 5,
    Swim: 6,
    Dig: 7
}

export const EggSize = {
    Tiny: 0,
    Small: 1,
    Medium: 2,
    Large: 3,
    Huge: 4,
    Giant: 5,
    Architectural: 6
}

const dayInSeconds = 86400

Object.freeze(EggSize)
Object.freeze(Maturity)
Object.freeze(SubSpecies)
Object.freeze(Attributes)
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
    var firstPart = address.substr(0, 3);
    var secondPart = address.substr(38, 4);
    var userAddr = firstPart + "..." + secondPart

    return userAddr;
}

export function shortTxHash(txHash) {
    var firstPart = txHash.substr(0, 3);
    var secondPart = txHash.substr(-5);
    var userAddr = firstPart + "..." + secondPart

    return userAddr;
}

//get balance 
export const getBalance = async (address) => {
    let balance = await web3.eth.getBalance(address);
    return balance;
}


//ether to wei
export const getWei = async (value) => {
    if (typeof value != 'string') value = String(value)
    let res = await web3.utils.toWei(value)
    return res
}

//Wei to ether
export const getEth = async (value) => {
    if (typeof value != 'string') value = String(value)
    let res = await web3.utils.fromWei(value)
    return res
}

export const timeDropdrown = {
    oneDay: dayInSeconds,
    twoDays: dayInSeconds * 2,
    threeDays: dayInSeconds * 3,
    week: dayInSeconds * 7,
    twoWeeks: dayInSeconds * 14,
    month: dayInSeconds * 30,
    twoMonths: dayInSeconds * 60,
    oneYear: dayInSeconds * 365
}
//Get stateMutability from abi solidty contract VIEW OR NonPayable
export function functionType(contractName) {
    const fType = contractsAbi[contractName].find(element => element.name == "startIncubation").stateMutability;
    return (fType == "view") ? "call" : "send"
}

export function get_unique_tokenid(sellOffers, rentOffers) {

    let concatArray = sellOffers.concat(rentOffers)
    let uniqueArray = []    
    //look into the short array
    concatArray.find((item) => {
        let checkunique = uniqueArray.find((unique) => unique.tokenId === item.tokenId)
        if (checkunique === undefined) {
            let checkSells = sellOffers.find(elem => elem.tokenId === item.tokenId);
            let checkRents = rentOffers.find(elem => elem.tokenId === item.tokenId);
            if (checkSells) {
                if (item.sellOffer !== undefined) {
                    item['rentOffer'] = checkSells.rentOffer
                } else {
                    item['sellOffer'] = checkSells.sellOffer
                }
            }
            if (checkRents) {
                if (item.sellOffer !== undefined) {
                    item['rentOffer'] = checkRents.rentOffer
                } else {
                    item['sellOffer'] = checkRents.sellOffer
                }
            }
            uniqueArray.push(item)
        }
    })
    uniqueArray.totalOffers = uniqueArray.length;
    console.log(uniqueArray);
    return uniqueArray;
}

export function orderByOffer(assets, _offerType) {
    const sortOffer = (_offerType === 1) ? "sellOffer" : "rentOffer";
    return assets.sort((a, b) => (a[sortOffer] > b[sortOffer]) ? 1 : -1);
}

export async function loadRentTerms(asset, _offerType) {
    if (_offerType === OfferType.ForSale || asset.rentOffer == undefined) return;

    let currentDeposit = asset.rentOffer.rent.deposit;
    let fee = asset.rentOffer.rent.price;
    let minDuration = asset.rentOffer.rent.minDuration / (24 * 60 * 60) + ' days';
    return {
        deposit: await getEth(currentDeposit),
        price: await getEth(fee),
        duration: minDuration
    };
}

export function loadOwner(account, owner) {
    account = account.toLowerCase();
    owner = owner.toLowerCase();
    if (account === owner) {
        owner = '<b class="yellowLink">You</b>';
    } else {
        owner = shortAddr(owner);
    }
    return owner;
}

export function speciesColor(specie) {
    let color;
    switch (specie) {
        case '0':
            color = "earth"
            break;
        case '1':
            color = "fire"
            break;
        case '2':
            color = "air"
            break;
        case '3':
            color = "water"
            break;
    }
    return color
}