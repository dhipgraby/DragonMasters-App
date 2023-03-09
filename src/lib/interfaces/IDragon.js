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
    let isOwner = isOwnerAccount(account, owner);
    dragon.isOwner = isOwner;
    let sellOffer;
    let rentOffer;

    if (isForSale) {
        sellOffer = await contract.market.getOffer(id, TokenType.Dragon);
        sellOffer.price = await getEth(sellOffer.sellPrice);
    }
    if (isForRent) {
        rentOffer = await contract.market.getOffer(id, TokenType.Dragon);
        let rentPrice = rentOffer.rent.price;
        rentOffer.rentPrice = await getEth(rentPrice);
        rentOffer.rentTerms = await loadRentTerms(rentOffer, OfferType.ForRent);
    }

    const dragonData = {
        contract: contract,
        dragon: dragon,
        account: account
    }

    const OfferData = {
        tokenId: dragon.tokenId,
        sellOffer: (sellOffer) ? sellOffer : null,
        rentOffer: (rentOffer) ? rentOffer : null,
        rentTerms: (rentOffer?.rentTerms) ? rentOffer.rentTerms : null,
        isForSale: isForSale,
        isForRent: isForRent,
        isOwner: isOwner,
        owner: dragon.owner,
        isApproved: false
    }
    console.log(OfferData);
    singleDragon.set(dragonData)
    singleOffer.set(OfferData)

}
