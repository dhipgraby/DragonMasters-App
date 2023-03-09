//CONTRACT
import { TokenType, OfferType } from '$lib/contracts/Marketplace';
import { loadContractData } from './Core';

export async function LoadInterface(from, to, interfaceName = 'All') {

    if (from > 0) {
        from -= 1;
        to -= 1;
    }
    to -= 1

    const LoadedContracts = await loadContractData();

    switch (interfaceName) {
        case 'Egg':
            await loadEggs(LoadedContracts, from, to)
            break;
        case 'Dragon':
            await loadDragons(LoadedContracts, from, to)
            break;
        case 'All':
            await loadEggs(LoadedContracts, from, to)
            await loadDragons(LoadedContracts, from, to)
            //HERE YOU CAN ALSO LOAD EVENTS & LISTENERS
            break;
    }
}

async function loadDragons(contract, from, to) {
    await contract['market'].getAssets(from, to, OfferType.ForSale, TokenType.Dragon);
    await contract['market'].getAssets(from, to, OfferType.ForRent, TokenType.Dragon);
}

async function loadEggs(contract, from, to) {
    await contract['market'].getAssets(from, to, OfferType.ForSale, TokenType.Egg);
    await contract['market'].getAssets(from, to, OfferType.ForRent, TokenType.Egg);
}
