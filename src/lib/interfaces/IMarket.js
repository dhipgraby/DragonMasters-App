//CONTRACT
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';
import { get } from "svelte/store";

export const contracts = createWritableStore('contract', []);

export async function LoadInterface(from, to, interfaceName = 'All') {

    console.log(from, to, interfaceName);

    if (from > 0) {
        from -= 1;
        to -= 1;
    }
    to -= 1

    let LoadedContracts = get(contracts)
    if (LoadedContracts.length < 1) {
        await loadContractData()
        await loadData(from, to, interfaceName)
    } else {
        await loadData(from, to, interfaceName)
    }
}

export async function loadData(from, to, interfaceName) {

    const LoadedContracts = get(contracts)

    switch (interfaceName) {
        case 'Egg':
            await loadEggs(LoadedContracts, from, to)
            break;
        case 'Dragon':
            await loadDragons(LoadedContracts, from, to)
            break;
        case 'All':
            await loadEggs(LoadedContracts, from, to)
            await loadDragons(LoadedContracts, from, to)
            //HERE YOU CAN ALSO LOAD EVENTS & LISTENERS
            break;
    }
}

async function loadContractData() {
    let contractData = []
    contractData['egg'] = await new EggContract();
    contractData['dragon'] = await new DragonContract();
    contractData['market'] = await new MarketplaceContract();
    contracts.set(contractData)
    return contractData;
}

async function loadDragons(contract, from, to) {
    await contract['market'].getAssets(from, to, OfferType.ForSale, TokenType.Dragon);
    await contract['market'].getAssets(from, to, OfferType.ForRent, TokenType.Dragon);
}

async function loadEggs(contract, from, to) {
    await contract['market'].getAssets(from, to, OfferType.ForSale, TokenType.Egg);
    await contract['market'].getAssets(from, to, OfferType.ForRent, TokenType.Egg);
}
