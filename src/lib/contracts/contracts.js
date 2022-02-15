import { writable } from 'svelte/store';
import { contractsAbi } from "./contractsAbi";

export const EggToken = "0x39D9Dea7Df7df0f7193BBa07059eaE6Fac018D7a"
export const Marketplace = "0x64052c23827F7d456e2fdaFfDC4854Edd8da40f9"
export const DragonToken = "0x84cEFdA29eD99733dBA1A388568E443335655987"

export const balances = writable({ contract: 0,user: 0 });

export async function contracts() {
    
    let account = web3.currentProvider.selectedAddress;

    let Egg_instance = new web3.eth.Contract(contractsAbi.EggToken, EggToken, {
        from: account,
    });

    let address = {
        EggToken:EggToken        
    }
    
    let contractData = {              
        address:address,
        account: account,
        EggToken:Egg_instance,    
        
    } 
    return contractData

}

export const updateBalances = async (dappBalance,userBalance) => {

    balances.update(value =>{
        value = { contract: dappBalance,user: userBalance }      
        return value
    }  )  

}