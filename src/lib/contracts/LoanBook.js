import { setAlert } from "$lib/storage/alerts";
import { userOffers } from "$lib/storage/marketplace";
import { dragonApproval, userDragons } from '$lib/storage/dragon'
import { contracts } from "./contracts";
import { get } from 'svelte/store';

const salePriceInWei = '500000000000000000'  //0.5 ETH
const rentPriceInWei = '10000000000000000'  // 0.01ETH
const rentDepositInWei = '300000000000000000'  //0.3 ETH
const rentMinTime = '2419200' //seconds: 2419200 == 4 weeks

export const TokenType = { Unknown: 0, Dna: 1, Egg: 2, Dragon: 3 }
export const OfferType = { NoOffer: 0, ForSale: 1, ForRent: 2, ForSaleOrRent: 3 }

export const rentTerms = {
    price: rentPriceInWei,
    rental: {
        deposit: rentDepositInWei,
        minDuration: rentMinTime
    }
}

export const saleTerms = {
    price: salePriceInWei,
    rental: {
        deposit: 0,
        minDuration: 0
    }
}

export class MarketplaceContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }

async getAllLoans(startIndex,endIndex){}

async getLoan(id){}

async getUserLoans(address){}

async isOnLoan(tokenId, tokenType){}

async getBorrowedBy(
    borrower, 
    startIndex,
    endIndex,
    tokenType
){}

async getLoanedBy(
    lender, 
    startIndex,
    endIndex,
    tokenType
){}


async getNumOnLoan(TokenType tokenType){

}

async getOnLoan(
    startIndex, 
    endIndex, 
    tokenType
){
    
}

}



