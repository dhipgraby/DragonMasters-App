//CONTRACT
import { writable, get } from 'svelte/store';
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
import { initEventListener } from '$lib/contracts/events';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';

export const contracts = createWritableStore('contract', []);
export const approvalRequired = writable(true)

export async function LoadInterface(from, to, interfaceName = 'All') {

    let contractData = await loadContractData()
    await checkApproval(contractData)

    switch (interfaceName) {
        case 'Eggs':
            await loadEggs(contractData, from, to)
            console.log('load eggs')
            break;
        case 'Dragons':
            await loadDragons(contractData, from, to)
            await loadDragonOffers(contractData, from, to)
            console.log('load dragons')
            break; 
        case 'All':
            console.log('load all')
            await loadEggs(contractData, from, to)
            await loadDragons(contractData, from, to)
            await loadDragonOffers(contractData, from, to)
            await loadEvents(contractData, from, to)
            break;
    }

}

async function loadContractData() {
    //IF CONTRACT DATA IS LOADED LOAD EVERY LIBRARY OTHERWISE JUST RETURN CONTRACTS DATA
    let contractData = []
    let contractsInterface = get(contracts)

    if (!contractsInterface.dragon) {
        contractData['egg'] = await new EggContract();
        contractData['dragon'] = await new DragonContract();
        contractData['market'] = await new MarketplaceContract();
        contracts.set(contractData)
    } else {
        contractData = contractsInterface     
    }
    return contractData
}

async function checkApproval(contract) {
    let approveForAll = await contract['market'].isApprovedForAll();
    if (approveForAll == true) {
        approvalRequired.set(false)
    } else {
        approvalRequired.set(true)
    }
}

async function loadEggs(contract, from, to) {
    await contract['egg'].getUserEggs(from, to);
}

async function loadDragons(contract, from, to) {
    await contract['dragon'].getUserDragons(from, to);
}

async function loadDragonOffers(contract, from, to) {
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, TokenType.Dragon)
    await contract['market'].getOfferedBy(from, to, OfferType.ForRent, TokenType.Dragon)
}

async function loadEvents(contract, from, to) {
    let contractEvents = await contract['egg'].getEvents();
    let updater = () => {
        contract['egg'].getUserEggs(from, to);
    }
    await initEventListener(contractEvents, updater, 'EggToken');
}