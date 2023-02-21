import { get } from 'svelte/store';
import { createWritableStore } from '$lib/helpers/storage';
//CONTRACT
import { EggContract } from '$lib/contracts/EggToken';
import { DragonContract } from '$lib/contracts/DragonToken';
import { LoanBookContract } from '$lib/contracts/LoanBook';
import { MarketplaceContract } from '$lib/contracts/Marketplace';

export const contracts = createWritableStore('contract', []);

export async function loadContractData() {
    //IF CONTRACT DATA IS LOADED LOAD EVERY LIBRARY OTHERWISE JUST RETURN CONTRACTS DATA
    let contractData = []
    let contractsInterface = get(contracts)

    if (!contractsInterface.dragon) {        
        contractData['egg'] = await new EggContract();
        contractData['dragon'] = await new DragonContract();
        contractData['market'] = await new MarketplaceContract();
        contractData['loanbook'] = await new LoanBookContract();    
        contracts.set(contractData)    
    } else {
        console.log('contracts already loaded')
        contractData = contractsInterface        
    }
    return contractData
}