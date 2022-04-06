import { writable } from 'svelte/store';
import { contractsAbi } from "./contractsAbi";

export const EggToken = "0xF56B763EfE7E43b2b18A93783C0A736bAF23c708"
export const Marketplace = "0xeb549fA7Be1b3B6BEadeC541AFFA996098CD6bFa"
export const DragonToken = "0xa64749c1447A46226306Ee7Aa103eeBc6e82fE28"
export const DnaToken = "0xf5346aa8EBeC5C7732361e259E6e449578D94ba1"

export const balances = writable({ contract: 0,user: 0 });

export async function contracts() {
    
    let account = web3.currentProvider.selectedAddress;

    let Egg_instance = new web3.eth.Contract(contractsAbi.EggToken, EggToken, {
        from: account,
    });

    let Dragon_instance = new web3.eth.Contract(contractsAbi.DragonToken, DragonToken, {
        from: account,
    });

    let Dna_instance = new web3.eth.Contract(contractsAbi.DnaToken, DnaToken, {
        from: account,
    });

    let address = {
        EggToken:EggToken,
        DragonToken:DragonToken,
        Marketplace:Marketplace,
        DnaToken:DnaToken        
    }
    
    let contractData = {              
        address:address,
        account: account,
        EggToken:Egg_instance,
        DragonToken:Dragon_instance,
        DnaToken:Dna_instance           
    } 

    return contractData

}

export const updateBalances = async (dappBalance,userBalance) => {

    balances.update(value =>{
        value = { contract: dappBalance,user: userBalance }      
        return value
    }  )  

}