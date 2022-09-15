//CONTRACT
import { writable } from 'svelte/store';
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';

export const contracts = createWritableStore('contract', []);

export async function LoadContract() {

    let LoadedContracts = get(contracts)

    if(LoadedContracts.lenght) return

    let contractData = []
    contractData['egg'] = await new EggContract();
    contractData['dragon'] = await new DragonContract();
    contractData['market'] = await new MarketplaceContract();
    contracts.set(contractData)
    
}

async function loadEggs(contract,from, to) {
    await contract['egg'].getUserEggs(from, to);    
}

async function loadDragons(contract,from, to) {
    await contract['market'].getAssets(from, to,OfferType.ForSale,TokenType.Dragon);    
}

async function loadOffers(contract,from, to) {
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, _tokenType)    
}
