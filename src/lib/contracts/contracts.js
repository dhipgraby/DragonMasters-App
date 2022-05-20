import { writable } from 'svelte/store';
import { contractsAbi } from "./contractsAbi";

export const EggToken = "0x8964658525Bf92fdc4bcFB17860e8339BDF4CbFD"
export const Marketplace = "0x6ae5a9AB2BF400eDbADFe76aA80d751c7798D46f"
export const DragonToken = "0x56098929989D0A530f72A99b1A7d722a15458F1F"
export const DnaToken = "0xe6B95F5b03dEe34583639A36E1680bA9425971e7"

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

    let marketplace_instance = new web3.eth.Contract(contractsAbi.Marketplace, Marketplace, {
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
        DnaToken:Dna_instance,
        Marketplace:marketplace_instance
    } 

    return contractData

}

export const updateBalances = async (dappBalance,userBalance) => {

    balances.update(value =>{
        value = { contract: dappBalance,user: userBalance }      
        return value
    }  )  

}