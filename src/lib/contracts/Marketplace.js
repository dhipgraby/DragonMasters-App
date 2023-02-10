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
            this.dragonInterface = await new DragonContract()
            this.eggInterface = await new EggContract()
            return this;
        })();
    }


    // Functions to configure & check setup of token types in Marketplace

    async registerToken(tokenContractAddress, offerType, tokenType, alert = false) {
        try {

            await this.contract.Marketplace.methods.registerToken(
                tokenContractAddress,
                offerType,
                tokenType
            ).send({}, async function (err, txHash) { 
                const offerTypeNames = (offerType == OfferType.ForSaleOrRent) ? 'sale and/or rent' : 
                    (offerType == OfferType.ForSale) ? 'sale' : 'rent';

                addAwaiter(txHash,'Register new token contract: '+tokenType+' to allow ' + offerTypeNames + ' offers')  
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('registerToken for contract' + tokenContractAddress, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: registerToken", err)
            const errMsg = getErrors('registerToken', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async isRegistered(tokenType, alert = false) {
        try {
            const registered = await this.contract.Marketplace.methods.isRegistered(tokenType).call()

            if (alert === true) setAlert('Token contract registered?: ' + registered, 'success')

            return registered

        } catch (err) {
            console.log("Error at: isRegistered", err)
            const errMsg = getErrors('isRegistered', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async getRegistered(tokenType, alert = false) {
        try {
            const contractAddress = await this.contract.Marketplace.methods.getRegistered(
                tokenType
            ).call()
            if (alert === true) setAlert('Contract address: ' + contractAddress, 'success')

            return contractAddress

        } catch (err) {
            console.log("Error at: getRegistered", err)
            const errMsg = getErrors('getRegistered', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async getSupportedOfferType(tokenType, alert = false) {
        try {
            const supportedOfferTypes = await this.contract.Marketplace.methods.getSupportedOfferType(
                tokenType
            ).call()
            console.log("Offer type 'For Sale':", OfferType.ForSale)
            console.log("Offer type 'For Rent':", OfferType.ForRent)
            console.log("Offer type 'For Sale and/or Rent':", OfferType.ForSaleOrRent)
            console.log("supportedOfferTypes:", supportedOfferTypes)
            const offerTypeNames = (supportedOfferTypes == OfferType.ForSaleOrRent) ? 'for sale and/or rent' : 
                (supportedOfferTypes == OfferType.ForSale) ? 'for sale only' : 'for rent only';

            if (alert === true) setAlert('Supported offer types: ' + offerTypeNames, 'success')

            return supportedOfferTypes

        } catch (err) {
            console.log("Error at: getSupportedOfferType", err)
            const errMsg = getErrors('getSupportedOfferType', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async isSellable(tokenType, alert = false) {
        try {
            const sellable = await this.contract.Marketplace.methods.isSellable(tokenType).call()

            if (alert === true) setAlert('Contract tokens are sellable?: ' + sellable, 'success')

            return sellable

        } catch (err) {
            console.log("Error at: isSellable", err)
            const errMsg = getErrors('isSellable', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async isRentable(tokenType, alert = false) {
        try {
            const rentable = await this.contract.Marketplace.methods.isRentable(tokenType).call()

            if (alert === true) setAlert('Contract tokens are rentable?: ' + rentable, 'success')

            return rentable

        } catch (err) {
            console.log("Error at: isRentable", err)
            const errMsg = getErrors('isRentable', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async pauseMarketplace(alert = false) {
        try {
            await this.contract.Marketplace.methods.pause().send({}, async function (err, txHash) { 

                addAwaiter(txHash,'Pause Marketplace operations')  
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('Paused Marketplace', 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: pauseMarketplace", err)
            const errMsg = getErrors('pauseMarketplace', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async unpauseMarketplace(alert = false) {
        try {
            await this.contract.Marketplace.methods.unpause().send({}, async function (err, txHash) { 

                addAwaiter(txHash,'Unpause Marketplace operations')  
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('Unpaused Marketplace', 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: unpauseMarketplace", err)
            const errMsg = getErrors('unpauseMarketplace', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    // Functions to set, get, modify and remove offers (for sale and/or for rent)

    async setOffer(tokenId, offerType, tokenType, terms, alert = false) {
        try {
            await this.contract.Marketplace.methods.setOffer(
                tokenId,
                terms,
                offerType,
                tokenType,
            ).send({}, async function (err, txHash) { 
                const offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Create '+offerName+' Offer')  
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('End rental for token Id ' + tokenId, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: setOffer", err)
            const errMsg = getErrors('setOffer', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async modifyOffer(tokenId, offerType, tokenType, terms, alert = false) {
        try {
            await this.contract.Marketplace.methods.modifyOffer(
                tokenId,
                terms,
                offerType,
                tokenType,
            ).send({}, async function (err, txHash) {                
                addAwaiter(txHash,'Modify Offer')
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('Modify offer for token Id ' + tokenId, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: modifyOffer", err)
            const errMsg = getErrors('modifyOffer', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    async getNumOffered(
        offerType,
        tokenType,
        alert = false
    ) {
        try {
            const numOffered = await this.contract.Marketplace.methods.getNumOffered(
                offerType,
                tokenType
            ).call()

            const offerName = (offerType == OfferType.ForSale) ? 'for sale' : 'for rent';
            if (alert === true) setAlert('Number offered ' + offerName + ': ' + numOffered, 'success')

            return numOffered

        } catch (err) {
            console.log("Error at: getNumOffered", err)
            const errMsg = getErrors('getNumOffered', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }
    
    async getOffered(
        startIndex,
        endIndex,
        _offerType,
        _tokenType,
        alert = false
    ) {
        try {
            let offers = []

            const ids = await this.contract.Marketplace.methods.getOffered(startIndex, endIndex, _offerType, _tokenType).call()
            const tokenIds = ids.tokenIds

            for (let i = 0; i < tokenIds.length; i++) {
                const currentOffer = await this.getOffer(ids.tokenIds[i], _tokenType)
                offers.push(currentOffer)
            }

            if (alert === true) setAlert('Total of ' + ids.totalOffered + ' offers.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            offers['totalOffers'] = ids.totalOffered
            return offers;

        } catch (err) {
            console.log("Error at: getOffered", err)
            const errMsg = getErrors('getOffered', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getNumOfferedBy(
        owner,
        offerType,
        tokenType,
        alert = false
    ) {
        try {
            const numOffered = await this.contract.Marketplace.methods.getNumOfferedBy(
                owner,
                offerType,
                tokenType
            ).call()

            const offerName = (offerType == OfferType.ForSale) ? 'for sale' : 'for rent';
            if (alert === true) setAlert('Number offered ' + offerName + ': ' + numOffered, 'success')

            return numOffered

        } catch (err) {
            console.log("Error at: getNumOfferedBy", err)
            const errMsg = getErrors('getNumOfferedBy', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
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
        try {
            let offers = []

            let ownAccount = false
            if (_account == '' | !_account | _account == undefined) {
                ownAccount = true
                _account = this.contract.account
            }
            const ids = await this.contract.Marketplace.methods.getOfferedBy(_account, startIndex, endIndex, _offerType, _tokenType).call()
            const tokenIds = ids.tokenIds

            for (let i = 0; i < tokenIds.length; i++) {
                const currentOffer = await this.getOffer(ids.tokenIds[i], _tokenType)
                offers.push(currentOffer)
            }

            //ITS ONLY UPDATES THE OFFER OF EXISTING TOKEN TYPE ON STORAGE
            if (ownAccount == true) {

                const assets = (_tokenType == TokenType.Dragon) ? get(userDragons) : get(userEggs)
                const offerName = (_offerType == OfferType.ForSale) ? 'sellOffer' : 'rentOffer';
                const assetOffers = assets.map(el => {
                    const TID = el.tokenId
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

            if (alert === true) setAlert('You have a total of ' + ids.totalOffered + ' offers.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            return offers;

        } catch (err) {
            console.log("Error at: getOfferedBy", err)
            const errMsg = getErrors('getOfferedBy', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getOffer(
        tokenId,
        tokenType,
        alert = false
    ) {
        try {
            const offer = await this.contract.Marketplace.methods.getOffer(
                tokenId,
                tokenType
            ).call()

            const rental = {
                price: offer.terms.rent.price,
                deposit: offer.terms.rent.rental.deposit,
                minDuration: offer.terms.rent.rental.minDuration
            }

            const result = {
                owner: offer.owner,
                tokenId: offer.tokenId,
                tokenType: offer.tokenType,
                offerType: offer.offerType,
                sellPrice: offer.terms.sale.price,
                rent: rental
            }

            if (alert === true) setAlert('Offer:<br>' + JSON.stringify(result), 'success')

            return result

        } catch (err) {
            console.log("Error at: getOffer", err)
            const errMsg = getErrors('getOffer', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getOfferTerms(
        tokenId,
        offerType,
        tokenType,
        alert = false
    ) {
        try {
            const terms = await this.contract.Marketplace.methods.getOfferTerms(
                tokenId,
                offerType,
                tokenType
            ).call()

            const offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
            if (alert === true) setAlert('Offer ' + offerName + 'Terms:<br>' + JSON.stringify(terms), 'success')

            return terms

        } catch (err) {
            console.log("Error at: getOfferTerms", err)
            const errMsg = getErrors('getOfferTerms', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async isOnOffer(
        tokenId,
        _offerType,
        _tokenType,
        alert = false
    ) {
        try {
            const onOffer = await this.contract.Marketplace.methods.isOnOffer(tokenId, _offerType, _tokenType).call()

            if (alert === true) setAlert('Is On Offer?: ' + onOffer, 'success')

            return onOffer

        } catch (err) {
            console.log("Error at: isOnOffer", err)
            const errMsg = getErrors('isOnOffer', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async removeOffer(
        tokenId,
        offerType,
        tokenType,
        alert = false
    ) {
        try {
            const offer = await this.contract.Marketplace.methods.removeOffer(
                tokenId,
                offerType,
                tokenType
            ).send({}, function (err, txHash) {
                const offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Remove '+offerName+' Offer')
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('Remove offer for token Id ' + tokenId, 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            console.log("Error at: removeOffer", err)
            const errMsg = getErrors('removeOffer', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async removeAllOffers(
        tokenId,
        tokenType,
        alert = false
    ) {
        try {
            const offer = await this.contract.Marketplace.methods.removeAllOffers(
                tokenId,
                tokenType
            ).send({}, function (err, txHash) {
                const offerName = (offerType == OfferType.ForSale) ? 'Sell' : 'Rent';
                addAwaiter(txHash,'Remove All '+offerName+' Offers')
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('Remove All ' + offerName + ' offers', 'success')
                    return txHash
                }
            })

            return offer
        } catch (err) {
            console.log("Error at: removeAllOffers", err)
            const errMsg = getErrors('removeAllOffers', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    // Functions to take an offer - buy & rent.

    async buy(tokenId, tokenType, price, alert = false) {
        try {
            await this.contract.Marketplace.methods.buy(
                tokenId,
                tokenType,
            ).send({
                from: this.contract.account,
                value: price
            }, function (err, txHash) {
                addAwaiter(txHash,'Buy token id: ' + tokenId)
                if (err) {
                    if (alert === true) setAlert(err, 'warning')
                    console.log('addAwaiter error: ', err)
                }
                else {
                    if (alert === true) setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: buyToken" + err)
            const errMsg = getErrors('buyToken', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async rent(tokenId, tokenType, price, deposit, alert = false) {
        try {
            const totalAmount = (Number(price) + Number(deposit))

            await this.contract.Marketplace.methods.rent(
                tokenId,
                tokenType,
            ).send({
                from: this.contract.account,
                value: totalAmount
            }, function (err, txHash) {
                addAwaiter(txHash,'Rent token id: '+tokenId)
                if (err) {
                    if (alert === true) setAlert(err, 'warning')
                    console.log('addAwaiter error: ', err)
                }
                else {
                    if (alert === true) setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: rent" + err)
            const errMsg = getErrors('rent', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    // Function to end a rental (of token that has been previosuly rented)

    async endRental(tokenId, tokenType, alert = false) {
        try {
            await this.contract.Marketplace.methods.endRental(
                tokenId,
                tokenType
            ).send({from: this.contract.account}, function (err, txHash) {
                addAwaiter(txHash,'End Rental of token id: '+tokenId)
                if (err) setAlert(err, 'warning')
                else {
                    if (alert === true) setAlert('End rental for token Id ' + tokenId, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: endRental", err)
            const errMsg = getErrors('endRental', err)
            if (alert === true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    // Supporting functions

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

    async getDragon(dragonId, alert = false) {

        try {
            let dragonDetails = await this.contract.DragonToken.methods.getDragon(dragonId).call()

            const toNumbers2D = arr => arr.map(arr => arr.map(Number));
            dragonDetails = {
                ...dragonDetails[0], skills: toNumbers2D(dragonDetails[1])
            }

            const dragon = {
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

            if (alert === true) setAlert('Dragon Details: ' + JSON.stringify(dragon), 'success')

            return dragon

        } catch (err) {
            setAlert('Error getting this Dragon id ', 'warning')
            console.log("Error at: getDragon" + err)
        }
    }

    async getDna(dnaId) {
        try {
            const dna = await this.contract.DnaToken.methods.getDna(dnaId).call()
            return dna

        } catch (err) {
            let errMsg = getErrors('getDna', err)
            console.log("Error at: getDragon" + errMsg)
        }
    }

    async getEgg(eggId, message = false) {

        try {
            const eggDetails = await this.contract.EggToken.methods.getEgg(eggId).call()

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
