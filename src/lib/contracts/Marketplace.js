import { addAwaiter, setAlert } from "$lib/storage/alerts";
import { dragonsForSale, eggsForSale, dragonsForRent, eggsForRent } from "$lib/storage/marketplace";
import { subSpeciesName } from "$lib/helpers/utils"
import { userDragons } from '$lib/storage/dragon'
import { userEggs } from '$lib/storage/eggs'
import { DragonContract } from '$lib/contracts/DragonToken';
import { EggContract } from '$lib/contracts/EggToken';
import { MarketApproval } from '$lib/contracts/MarketApproval';
import { contracts } from "./contracts";
import { get } from 'svelte/store';
import { getErrors } from "./errorHandling";

export const TokenType = { Unknown: 0, Dna: 1, Egg: 2, Dragon: 3 }
export const OfferType = { NoOffer: 0, ForSale: 1, ForRent: 2, ForSaleOrRent: 3 }

export const rentTerms = {
    price: '0',
    rental: {
        deposit: '0',
        minDuration: '0'
    }
}

export const saleTerms = {
    price: '0',
    rental: {
        deposit: 0,
        minDuration: 0
    }
}

export class MarketplaceContract extends MarketApproval {
    constructor() {
        super()
        this.contract
        this.marketplace
        return (async () => {
            this.contract = await contracts();
            // this.dragonInterface = await new DragonContract()
            // this.eggInterface = await new EggContract()
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
                addAwaiter(txHash,'Buying Token id: ' + tokenId)
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

    async rentToken(tokenId, tokenType, price, deposit) {
        const totalAmount = (Number(price) + Number(deposit))
        console.log('totalAmount: ' + totalAmount);
        try {
            let offer = await this.contract.Marketplace.methods.rent(
                tokenId,
                tokenType,
            ).send({
                from: this.contract.account,
                value: totalAmount
            }, function (err, txHash) {
                addAwaiter(txHash,'Rent Token')
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token id: ' + tokenId + ' Rented!', 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            setAlert('Rent token error ', 'warning')
            console.log("Error at: rentToken " + err)
        }
    }

    async endRental(tokenId, tokenType , alert = false) {
        try {
            await this.contract.Marketplace.methods.endRental(
                tokenId,
                tokenType
            ).send({from: this.contract.account}, function (err, txHash) {
                addAwaiter(txHash,'Ending Rental of token id:'+tokenId)
                if (err) setAlert(err, 'warning')
                else {
                    if (alert) setAlert('Ending rental for token Id ' + tokenId + '. Tx: ' + txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: endRental", err)
            const errMsg = getErrors('endRental', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async setOffer(tokenId, offerType, tokenType, terms) {
        
        try {
            let offer = await this.contract.Marketplace.methods.setOffer(
                tokenId,
                terms,
                offerType,
                tokenType,
            ).send({}, async function (err, txHash) { 
                let offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Create '+offerName+' Offer')                   
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
            ).send({}, async function (err, txHash) {                
                addAwaiter(txHash,'Modify Offer')
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
        //Collecting all offers and details 
        let allOffers = await this.getOffered(from, to, _offerType, _tokenType)        
        let tokenIds = allOffers.map((el) => { return el.tokenId });
        let assets = []

        for (let i = 0; i < tokenIds.length; i++) {
            let assetsDetails

            if (_tokenType == TokenType.Dragon) {
                assetsDetails = await this.getDragon(Number(tokenIds[i]))
                assetsDetails['dna'] = await this.getDna(assetsDetails.dnaId)
            } else {
                assetsDetails = await this.getEgg(tokenIds[i])
            }
            assets.push(assetsDetails)
        }

        let offerName = (_offerType == OfferType.ForSale) ? 'sellOffer' : 'rentOffer';
        let offers = assets.map(el => {

            let TID = el.tokenId.toString()

            if (tokenIds.includes(TID)) {

                el[offerName] = allOffers.find(function (offer) {
                    el["owner"] = offer.owner
                    return offer.tokenId === TID;
                });
            }
            return el
        })
        offers['totalOffers'] = allOffers.totalOffers

        if (_tokenType == TokenType.Dragon) {
            if ((_offerType == OfferType.ForSale)) {
                dragonsForSale.set(offers)
            } else {
                dragonsForRent.set(offers)
            }
        } else {
            if ((_offerType == OfferType.ForSale)) {
                eggsForSale.set(offers)
            } else {
                eggsForRent.set(offers)
            }
        }
        return offers
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

            if (alert == true) setAlert('There is a total of ' + ids.totalOffered + ' offers.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            offers['totalOffers'] = ids.totalOffered
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

            //ITS ONLY UPDATES THE OFFER OF EXISTING TOKEN TYPE ON STORAGE
            if (ownAccount == true) {
                let assets = (_tokenType == TokenType.Dragon) ? get(userDragons) : get(userEggs)
                let offerName = (_offerType == OfferType.ForSale) ? 'sellOffer' : 'rentOffer';
                let assetOffers = assets.map(el => {
                    let TID = el.tokenId
                    if (tokenIds.includes(TID)) {
                        if (el.offer == undefined) el.offer = []
                        el.offer[offerName] = offers.find(function (offer) {
                            return offer.tokenId === TID;
                        });
                    }
                    return el
                })
                
                assetOffers.totalOwned = assets.totalOwned;
                
                switch (_tokenType) {
                    case TokenType.Dragon:                        
                        userDragons.set(assetOffers)
                        break;
                    case TokenType.Egg:
                        userEggs.set(assetOffers)
                        break;
                }
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
                let offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Remove '+offerName+' Offer')
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
                let offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Remove all '+offerName+' Offers')
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

    async getDragon(dragonId, alert = false) {

        try {
            let dragonDetails = await this.contract.DragonToken.methods.getDragon(dragonId).call()

            const toNumbers2D = arr => arr.map(arr => arr.map(Number));
            dragonDetails = {
                ...dragonDetails[0], skills: toNumbers2D(dragonDetails[1])
            }

            let dragon = {
                tokenId: dragonId,
                dnaId: dragonDetails.dnaId,
                subSpecies: subSpeciesName(dragonDetails.species),
                fullEnergyAt: dragonDetails.fullEnergyAt,
                ageGroup: dragonDetails.age.group,
                birthTime: dragonDetails.age.birthTime,
                maturesAt: dragonDetails.age.maturesAt,
                mumId: 0,
                dadId: 0,
                skills: dragonDetails.skills,
                attributes: dragonDetails.attributes,
            }

            if (alert == true) setAlert('Dragon Details: ' + JSON.stringify(dragon), 'success')

            return dragon

        } catch (err) {
            setAlert('Error getting this Dragon id ', 'warning')
            console.log("Error at: getDragon" + err)
        }
    }

    async getDna(dnaId) {
        try {
            let dna = await this.contract.DnaToken.methods.getDna(dnaId).call()
            return dna

        } catch (err) {
            let errMsg = getErrors('getDna', err)
            console.log("Error at: getDragon" + errMsg)
        }
    }

    async getEgg(eggId, message = false) {

        try {
            let eggDetails = await this.contract.EggToken.methods.getEgg(eggId).call()

            if (message == true) setAlert(eggDetails, 'success')
            return {
                tokenId: eggId,
                mumId: eggDetails.mumId,
                dadId: eggDetails.dadId,
                incubation: eggDetails.incubationCompleteAt,
                laidTime: eggDetails.laidTime,
                subSpecies: subSpeciesName(eggDetails.species),
            }

        } catch (err) {
            setAlert('Error getting this egg id ', 'warning')
            console.log("Error at: cgetEgg" + err)
        }
    }
}



