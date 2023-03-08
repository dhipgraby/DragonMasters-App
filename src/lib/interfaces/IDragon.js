import { loadContractData } from './Core';
import { singleDragon } from '$lib/storage/dragon';
import { singleOffer } from '$lib/storage/marketplace';
import { TokenType } from '$lib/contracts/MarketApproval';
import { OfferType } from '$lib/contracts/Marketplace';
import { isOwnerAccount } from '$lib/helpers/utils';
import { getEth } from '$lib/helpers/utils.js';
import { loadRentTerms } from '$lib/helpers/utils.js';

export async function LoadInterface(dragonId) {

    let contract = await loadContractData();
    await loadDragon(dragonId, contract)
}

async function loadDragon(id, contract) {

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
        let salePrice = dragon.sellOffer.sellPrice;
        dragon.price = await getEth(salePrice);
        dragon.offer.sellOffer.price = dragon.price
    }
    if (isForRent) {
        dragon.rentOffer = await contract.market.getOffer(id, TokenType.Dragon);
        dragon.offer.rentOffer = dragon.rentOffer;
        let rentPrice = dragon.rentOffer.rent.price;
        dragon.rentPrice = await getEth(rentPrice);
        dragon.rentTerms = await loadRentTerms(dragon, OfferType.ForRent);
    }

    const dragonData = {
        contract: contract,
        dragon: dragon,
        isOwner: isOwner,
        isForSale: isForSale,
        isForRent: isForRent,
        account: account
    }

    const OfferData = {
        tokenId:dragon.tokenId,
        sellOffer: (dragon.sellOffer) ? dragon.sellOffer : null,
        rentOffer: (dragon.rentOffer) ? dragon.rentOffer : null,
        rentTerms: (dragon.rentTerms) ? dragon.rentTerms : null,
        isForSale: isForSale,
        isForRent: isForRent,
        isOwner:isOwner,
        isApproved:false
    }
    console.log(OfferData);
    singleDragon.set(dragonData)
    singleOffer.set(OfferData)

}
