import { setAlert } from "$lib/storage/alerts";
import { contracts } from "./contracts";

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

    async setOffer(tokenId, offerType, tokenType, terms) {
        try {
            let offer = await this.contract.Marketplace.methods.setOffer(
                tokenId,
                terms,
                offerType,
                tokenType,
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('setOffer error ', 'warning')
            console.log("Error at: setOffer " + err)
        }
    }

    async getOffer(
        tokenId,
        tokenType
    ) {
        try {
            let offer = await this.contract.Marketplace.methods.getOffer(
                tokenId,
                tokenType
            ).call()

            let rental = {
                price: offer.terms.rent.price,
                deposit: offer.terms.rent.rental.deposit,
                minDuration: offer.terms.rent.rental.minDuration
            }

            let result = {
                owner: offer.owner,
                tokenId: offer.tokenId,
                tokenType: offer.tokenType,
                offerType: offer.offerType,
                sellPrice: offer.terms.sale.price,
                rent: rental
            }

            console.log(result)

            setAlert(JSON.stringify(result), 'success')

        } catch (err) {
            setAlert('getOffer error ', 'warning')
            console.log('Error at: getOffer ' + err)
        }
    }

    async removeOffer(
        tokenId,
        offerType,
        tokenType
    ) {
        try {
            let offer = await this.contract.Marketplace.methods.removeOffer(
                tokenId,
                offerType,
                tokenType
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('removeOffer error ', 'warning')
            console.log("Error at: removeOffer " + err)
        }
    }

    
    async removeAllOffers(
        tokenId,        
        tokenType
    ) {
        try {
            let offer = await this.contract.Marketplace.methods.removeAllOffers(
                tokenId,                
                tokenType
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('removeAllOffers error ', 'warning')
            console.log("Error at: removeAllOffers " + err)
        }
    }


    async approveToken(tokenId) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.approve(
                this.contract.address.Marketplace,
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' approved', 'success')
                    return txHash
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('approveToken error ', 'warning')
            console.log('Error at: approveToken ' + err)
        }
    }

    async approveForAll() {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                true
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Maketplace approved for all', 'success')
                    return txHash
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
        }
    }

    async removeApproveForAll() {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                false
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Maketplace approved for all removed!', 'success')
                    return txHash
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
        }
    }


    async getApproved(tokenId,msg = false) {

        let isApproved
        const contractAddress = this.contract.address.Marketplace

        try {
            await this.contract.DragonToken.methods.getApproved(tokenId).call({}, (err, approved) => {
    
                if (err) console.log(err)
                if (contractAddress == approved) {
                    
                    if(msg == true) setAlert(tokenId + ' is approved','success')
                    isApproved = true;
                } else {
                    if(msg == true) setAlert(tokenId + ' is not approved','warning')                    
                    isApproved = false
                }
    
            })
        }
        catch (err) {
            console.log("Error from singleApprove(): " + err)
        }
        return isApproved
    }
    
    async isApprovedForAll(msg = false) {
    
        try {
            const isMarketplaceAnOperator = await this.contract.DragonToken.methods.isApprovedForAll(this.contract.account, this.contract.address.Marketplace).call()
            
            if(isMarketplaceAnOperator == true){
                if(msg == true) setAlert('This account is Aprrove fro All','success')
            } else {
                if(msg == true) setAlert('Not approve for All','warning')
            } 
            return isMarketplaceAnOperator
        } catch (error) {
            setAlert('Contract error, please check metamask account and connection','warning')            
        }    
    }
    

}



