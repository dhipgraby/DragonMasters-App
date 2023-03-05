import { loadContractData } from './Core';
import { singleDragon } from '$lib/storage/dragon';
import { TokenType } from '$lib/contracts/MarketApproval';
import { OfferType } from '$lib/contracts/Marketplace';
import { isOwnerAccount } from '$lib/helpers/utils';

export async function LoadInterface(dragonId) {

    let contract = await loadContractData();
    await loadDragon(dragonId,contract)
}

 async function loadDragon(id,contract){
    
    await contract.market.isApprovedForAll(TokenType.Dragon);
    let dragon = await contract.dragon.getDragon(id);
    let isForSale = await contract.market.isOnOffer(id, OfferType.ForSale, TokenType.Dragon);
    let isForRent = await contract.market.isOnOffer(id, OfferType.ForRent, TokenType.Dragon);
    let owner = await contract.dragon.ownerOf(id);
    let account = await contract.dragon.contract.account;
    dragon.owner = owner;
    let isOwner = await isOwnerAccount(account, owner);		
    if (isForSale) {
        dragon.sellOffer = await contract.market.getOffer(id, TokenType.Dragon);
        dragon.offer.sellOffer = dragon.sellOffer;
    }
    if (isForRent) {
        dragon.rentOffer = await contract.market.getOffer(id, TokenType.Dragon);
        dragon.offer.rentOffer = dragon.rentOffer;
    }		

    const dragonData = {
        contract:contract,
        dragon:dragon,
        isOwner:isOwner,
        isForSale:isForSale,
        isForRent:isForRent,
        account:account        
    }

    singleDragon.set(dragonData)
    
 }
