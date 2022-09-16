//CONTRACT
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { MarketplaceContract, TokenType, OfferType } from '$lib/contracts/Marketplace';
//STORAGE
import { createWritableStore } from '$lib/helpers/storage';

export const contracts = createWritableStore('contract', []);

export async function LoadInterface() {
    
    // let LoadedContracts = get(contracts)
    // if(LoadedContracts.lenght) return

    let contractData = []
    contractData['egg'] = await new EggContract();
    contractData['dragon'] = await new DragonContract();
    contractData['market'] = await new MarketplaceContract();
    contracts.set(contractData)    
    await loadDragons(contractData,0,10) 
}

async function loadDragons(contract,from, to) {
    await contract['market'].getAssets(from, to,OfferType.ForSale,TokenType.Dragon);    
}
