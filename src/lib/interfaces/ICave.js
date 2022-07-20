//CONTRACT
import { writable } from 'svelte/store';
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
import { initEventListener } from '$lib/contracts/events';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';

export const contracts = createWritableStore('contract', []);
export const approvalRequired = writable(true)

export async function LoadInterface(from, to) {

    let contractData = []
    contractData['egg'] = await new EggContract();
    contractData['dragon'] = await new DragonContract();
    contractData['market'] = await new MarketplaceContract();
    
    contracts.set(contractData)
    await checkApproval(contractData)    
    await loadAssets(contractData,from, to)
    await loadEvents(contractData,from,to)                
}

async function checkApproval(contract){
    let approveForAll = await contract['market'].isApprovedForAll();
		if (approveForAll == true) {
			approvalRequired.set(false)
		} else {
			approvalRequired.set(true)
		}
}

async function loadAssets(contract,from, to){
    await loadEggs(contract,from, to)
    await loadDragons(contract,from, to)    
    await loadOffers(contract,from, to)    
}

async function loadEggs(contract,from, to) {
    await contract['egg'].getUserEggs(from, to);
    console.log('loading Eggs');
}

async function loadDragons(contract,from, to) {
    await contract['dragon'].getUserDragons(from, to);
    console.log('loading Dragons');
}

async function loadOffers(contract,from, to) {
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, TokenType.Dragon)
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, TokenType.Egg)
    console.log('offers');
}

async function loadEvents(contract,from,to) {
    let contractEvents = await contract['egg'].getEvents();
    let updater = () => {
        contract['egg'].getUserEggs(from, to);
    }
    await initEventListener(contractEvents, updater, 'EggToken');
}