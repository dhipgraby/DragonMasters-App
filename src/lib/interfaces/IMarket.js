//CONTRACT
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';
import { get } from "svelte/store";

export const contracts = createWritableStore('contract', []);

export async function LoadInterface(from, to) {

    let LoadedContracts = get(contracts)
    if (LoadedContracts.lenght) {
        await loadDragons(LoadedContracts, from, to)
    } else {
        let contractData = await loadContractData()        
        await loadDragons(contractData, from, to)
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
}

async function loadEggs(contract, from, to) {
    await contract['market'].getAssets(from, to, OfferType.ForSale, TokenType.Egg);
}
