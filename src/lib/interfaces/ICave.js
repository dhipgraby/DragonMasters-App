import { writable } from 'svelte/store';
//CONTRACT
import { LoanType } from '$lib/contracts/LoanBook';
import { TokenType, OfferType } from '$lib/contracts/Marketplace';
import { initEventListener } from '$lib/contracts/events';
import { loadContractData } from './Core';
//STORAGE
// import { setAlert } from '$lib/storage/alerts';

export const approvalRequired = writable({ dragon: true, egg: true })

export async function LoadInterface(from, to, interfaceName = 'All') {   

    if (from > 0) {
        from -= 1;
        to -= 1;
    }
    to -= 1

    let contractData = await loadContractData()
    
    await contractData['market'].isApprovedForAll(TokenType.Egg);
    await contractData['market'].isApprovedForAll(TokenType.Dragon);

    switch (interfaceName) {
        case 'Egg':
            await loadEggs(contractData, from, to)
            await loadEggOffers(contractData, from, to)
            break;
        case 'Dragon':
            await loadDragons(contractData, from, to)
            await loadDragonOffers(contractData, from, to)
            break;
        case 'All':
            await loadEggs(contractData, from, to)
            await loadDragons(contractData, from, to)
            await loadDragonOffers(contractData, from, to)
            await loadEggOffers(contractData, from, to)
            await loadEvents(contractData, from, to)
            break;
    }
}

export async function LoanBookInterface(from, to, interfaceName = 'All') {
    
    if (from > 0) {
        from -= 1;
        to -= 1;
    }
    to -= 1

    let contractData = await loadContractData()
    switch (interfaceName) {
        case 'Egg':
            await loadEggLoans(contractData, from, to)
            break;
        case 'Dragon':
            await loadDragonLoans(contractData, from, to)
            break;
        case 'All':
            await loadEggLoans(contractData, from, to)
            await loadDragonLoans(contractData, from, to)
            break;
    }
}
//USER EGGS
async function loadEggs(contract, from, to) {
    await contract['egg'].getUserEggs(from, to);
}
//USER DRAGONS
async function loadDragons(contract, from, to) {
    await contract['dragon'].getUserDragons(from, to);
}
//USER EGG OFFERS
async function loadDragonOffers(contract, from, to) {
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, TokenType.Dragon)
    await contract['market'].getOfferedBy(from, to, OfferType.ForRent, TokenType.Dragon)
}
//USER DRAGON OFFERS
async function loadEggOffers(contract, from, to) {
    await contract['market'].getOfferedBy(from, to, OfferType.ForSale, TokenType.Egg)
    await contract['market'].getOfferedBy(from, to, OfferType.ForRent, TokenType.Egg)
}
//USER EGG LOANBOOK
async function loadEggLoans(contract, from, to) {
    await contract['loanbook'].getUserLoans(from, to, TokenType.Egg, LoanType.Lend)
    await contract['loanbook'].getUserLoans(from, to, TokenType.Egg, LoanType.Borrow)
}
//USER DRAGONS LOANBOOK
async function loadDragonLoans(contract, from, to) {
    await contract['loanbook'].getUserLoans(from, to, TokenType.Dragon, LoanType.Lend)
    await contract['loanbook'].getUserLoans(from, to, TokenType.Dragon, LoanType.Borrow)
}

async function loadEvents(contract, from, to) {
    let contractEvents = await contract['egg'].getEvents();
    let updater = () => {
        contract['egg'].getUserEggs(from, to);
    }
    await initEventListener(contractEvents, updater, 'EggToken');
}