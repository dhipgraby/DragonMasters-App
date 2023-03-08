import { loadContractData } from './Core';
import { singleEgg } from '$lib/storage/eggs';
import { singleOffer } from '$lib/storage/marketplace';
import { TokenType } from '$lib/contracts/MarketApproval';
import { OfferType } from '$lib/contracts/Marketplace';
import { isOwnerAccount } from '$lib/helpers/utils';
import { getEth } from '$lib/helpers/utils.js';
import { loadRentTerms } from '$lib/helpers/utils.js';

export async function LoadInterface(eggId) {

    let contract = await loadContractData();
    await loadEgg(eggId, contract)
}

async function loadEgg(id, contract) {

    await contract.market.isApprovedForAll(TokenType.Egg);
    let egg = await contract.egg.getEgg(id);
    let isForSale = await contract.market.isOnOffer(id, OfferType.ForSale, TokenType.Egg);
    let isForRent = await contract.market.isOnOffer(id, OfferType.ForRent, TokenType.Egg);
    let owner = await contract.egg.ownerOf(id);
    let account = await contract.egg.contract.account;
    egg.owner = owner;
    let isOwner = await isOwnerAccount(account, owner);
    egg.isOwner = isOwner;
    let incubationTime = (egg.incubation == '0') ? null : await contract.egg.checkIncubation(id, false)
    egg.incubationTime = incubationTime
    let sellOffer;
    let rentOffer;

    if (isForSale) {
        sellOffer = await contract.market.getOffer(id, TokenType.Egg);
        sellOffer.price = await getEth(sellOffer.sellPrice);
    }
    if (isForRent) {
        rentOffer = await contract.market.getOffer(id, TokenType.Egg);
        rentOffer.rentPrice = await getEth(rentOffer.rent.price);
        rentOffer.rentTerms = await loadRentTerms(rentOffer, OfferType.ForRent);
    }

    const eggData = {
        contract: contract,
        egg: egg,
        account: account
    }

    const OfferData = {
        tokenId: egg.tokenId,
        sellOffer: (sellOffer) ? sellOffer : null,
        rentOffer: (rentOffer) ? rentOffer : null,
        rentTerms: (rentOffer?.rentTerms) ? rentOffer.rentTerms : null,
        isForSale: isForSale,
        isForRent: isForRent,
        isOwner: isOwner,
        owner: egg.owner,
        isApproved: false
    }
    console.log(OfferData);
    singleEgg.set(eggData)
    singleOffer.set(OfferData)

}
