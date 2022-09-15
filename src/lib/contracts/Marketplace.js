import { setAlert } from "$lib/storage/alerts";
import { dragonsForSale } from "$lib/storage/marketplace";
import { dragonApproval, userDragons } from '$lib/storage/dragon'
import { DragonContract } from '$lib/contracts/DragonToken';
import { contracts } from "./contracts";
import { get } from 'svelte/store';

const salePriceInWei = '500000000000000000'  //0.5 ETH
const rentPriceInWei = '10000000000000000'  // 0.01ETH
const rentDepositInWei = '300000000000000000'  //0.3 ETH
const rentMinTime = '2419200' //seconds: 2419200 == 4 weeks

export const TokenType = { Unknown: 0, Dna: 1, Egg: 2, Dragon: 3 }                                                                                                                                                                                                                                                                                                                    
export const OfferType = { NoOffer: 0, ForSale: 1, ForRent: 2, ForSaleOrent: 3 }

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
        this.marketplace
        return (async () => {
            this.contract = await contracts();
            this.dragonInterface = await new DragonContract()
            return this;
        })();
    }

    async buyToken(tokenId, tokenType, price) {

        try {
            let offer = await this.contract.Marketplace.methods.buy(
                tokenId,
                tokenType,
            ).send({
                from: this.contract.account,
                value: price
            }, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token id: ' + tokenId + ' Bought!', 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('Buy token error ', 'warning')
            console.log("Error at: buyToken " + err)
        }
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
                    setAlert('New offer created!', 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('setOffer error ', 'warning')
            console.log("Error at: setOffer " + err)
        }
    }

    async modifyOffer(tokenId, offerType, tokenType, terms) {
        try {
            let offer = await this.contract.Marketplace.methods.modifyOffer(
                tokenId,
                terms,
                offerType,
                tokenType,
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Offer Modifyed!', 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('Error setting offer, try again or contact support.', 'warning')
            console.log("Error at: setOffer " + err)
        }
    }

    async getAssets(
        from,
        to,
        _offerType,
        _tokenType
        ) {

        let allDragons = await this.getOffered(from, to,_offerType,_tokenType)
        let dragons = []
        
        let tokenIds = allDragons.map((el) => {
            return el.tokenId
        })

        for (let i = 0; i < tokenIds.length; i++) {
            let dragonDetails = await this.dragonInterface.getDragon(tokenIds[i])            
            dragons.push(dragonDetails)
        }

        console.log(dragons)

        dragonsForSale.set(dragons)
    }


    async getOffer(
        tokenId,
        tokenType,
        alert = false
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

            if (alert == true) setAlert('Offer:<br>' + JSON.stringify(result), 'success')

            return result

        } catch (err) {
            setAlert('getOffer error ', 'warning')
            console.log('Error at: getOffer ' + err)
        }
    }

    async getOffered(
        startIndex,
        endIndex,
        _offerType,
        _tokenType,
        alert = false
    ) {

        let offers = []

        try {

            let ids = await this.contract.Marketplace.methods.getOffered(startIndex, endIndex, _offerType, _tokenType).call()
            let tokenIds = ids.tokenIds

            for (let i = 0; i < tokenIds.length; i++) {
                let currentOffer = await this.getOffer(ids.tokenIds[i], _tokenType)
                offers.push(currentOffer)
            }

            let dragons = get(dragonsForSale)
            let offerName = (_offerType == OfferType.ForSale) ? 'sellOffer' : 'rentOffer';
            let dragonOffers = dragons.map(el => {
                let TID = el.tokenId
                if (tokenIds.includes(TID)) {
                    if (el.offer == undefined) el.offer = []
                    el.offer[offerName] = offers.find(function (offer) {
                        return offer.tokenId === TID;
                    });
                }
                return el
            })
            dragonsForSale.set(dragonOffers)
            console.log(dragonOffers)

            if (alert == true) setAlert('There is a total of ' + ids.totalOffered + ' offers.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            return offers;

        } catch (err) {
            setAlert('getOffered error', 'warning')
            console.log("Error at: getOffered" + err)
        }
    }

    async getOfferedBy(
        startIndex,
        endIndex,
        _offerType,
        _tokenType,
        _account,
        alert = false
    ) {

        let offers = []

        try {

            let ownAccount = false
            if (_account == '' | !_account | _account == undefined) {
                ownAccount = true
                _account = this.contract.account
            }

            let ids = await this.contract.Marketplace.methods.getOfferedBy(_account, startIndex, endIndex, _offerType, _tokenType).call()
            let tokenIds = ids.tokenIds

            for (let i = 0; i < tokenIds.length; i++) {
                let currentOffer = await this.getOffer(ids.tokenIds[i], _tokenType)
                offers.push(currentOffer)
            }

            //ITS ONLY UPDATES THE OFFER OF EXISTING DRAGON TOKEN ON STORAGE
            if (ownAccount == true) {
                let dragons = get(userDragons)
                let offerName = (_offerType == OfferType.ForSale) ? 'sellOffer' : 'rentOffer';
                let dragonOffers = dragons.map(el => {
                    let TID = el.tokenId
                    if (tokenIds.includes(TID)) {
                        if (el.offer == undefined) el.offer = []
                        el.offer[offerName] = offers.find(function (offer) {
                            return offer.tokenId === TID;
                        });
                    }
                    return el
                })
                userDragons.set(dragonOffers)
                console.log(dragonOffers)
            }

            if (alert == true) setAlert('You have a total of ' + ids.totalOffered + ' offers.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            return offers;

        } catch (err) {
            setAlert('getOfferedBy error', 'warning')
            console.log("Error at: getOfferedBy" + err)
        }
    }

    async isOnOffer(
        tokenId,
        _offerType,
        _tokenType,
        alert = false
    ) {
        try {
            let onOffer = await this.contract.Marketplace.methods.isOnOffer(tokenId, _offerType, _tokenType).call()
            return onOffer
        } catch (err) {
            if (alert == true) setAlert('isOnOffer error', 'warning')
            console.log("Error at: isOnOffer" + err)
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
    // APPROVAL FUNCTIONS
    async approveToken(tokenId) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.approve(
                this.contract.address.Marketplace,
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' approved', 'success')
                    return true
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('ApproveToken error ', 'warning')
            console.log('Error at: approveToken ' + err)
            return false;
        }
    }

    async revokeToken(tokenId) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.approve(
                "0x0000000000000000000000000000000000000000",
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' revoked', 'success')
                    return true
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('revokeToken error ', 'warning')
            console.log('Error at: revokeToken ' + err)
            return false;
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
                    dragonApproval.set(true)
                    setAlert('Maketplace approved for all', 'success')
                    return true
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
            return false
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
                    dragonApproval.set(false)
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

    async getApproved(tokenId, msg = false) {

        let isApproved
        const contractAddress = this.contract.address.Marketplace

        try {
            await this.contract.DragonToken.methods.getApproved(tokenId).call({}, (err, approved) => {

                if (err) console.log(err)
                if (contractAddress == approved) {

                    if (msg == true) setAlert(tokenId + ' is approved', 'success')
                    isApproved = true;
                } else {
                    if (msg == true) setAlert(tokenId + ' is not approved', 'warning')
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

            if (isMarketplaceAnOperator == true) {
                dragonApproval.set(true)
                if (msg == true) setAlert('This account is Aprrove fro All', 'success')
            } else {
                if (msg == true) setAlert('Not approve for All', 'warning')
            }
            return isMarketplaceAnOperator
        } catch (error) {
            setAlert('Contract error, please check metamask account and connection', 'warning')
        }
    }


}



