// @ts-nocheck
import { setAlert,addAwaiter } from "$lib/storage/alerts";
import { userEggs } from "$lib/storage/eggs";
import { subSpeciesName,EggSize } from "$lib/helpers/utils"
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

export class EggContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }

    async mintGen0EggsTo(owner, amount, alert = false) {
        try {
            await this.contract.EggToken.methods.mintGen0EggsTo(owner,amount,EggSize.Medium).send({}, function (err, txHash) {
                addAwaiter(txHash,'Minting Gen-0 Egg')
                if (err) {
                    if (alert) setAlert(err, 'warning')
                    console.log('addAwaiter error: ', err)
                }
                else {
                    if (alert) setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: mintGen0EggTo" + err)
        }
    }

    async getEggIds(owner, startIndex, endIndex, alert = false){
        try {
            const eggIds = await this.contract.EggToken.methods.getEggIds(owner, startIndex, endIndex).call()
            if (alert == true) setAlert('Egg Ids: '+ JSON.stringify(eggIds), 'success')
            return eggIds
        } catch (err) {
            console.log("Error at: getEggIds", err)
            const errMsg = getErrors('getEggIds', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getAllEggIds(startIndex, endIndex, alert = false){
        try {
            const eggIds = await this.contract.EggToken.methods.getAllEggIds(startIndex, endIndex).call()
            if (alert == true) setAlert('Egg Ids: '+ JSON.stringify(eggIds), 'success')

            return eggIds

        } catch (err) {
            console.log("Error at: getAllEggIds", err)
            const errMsg = getErrors('getAllEggIds', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getEgg(eggId, alert = false) {
 
        try {
            let eggDetails = await this.contract.EggToken.methods.getEgg(eggId).call()
            
            const egg = {
                tokenId: eggId,
                eggSize:eggDetails.size,
                mumId: eggDetails.mumId,
                dadId: eggDetails.dadId,
                incubation: eggDetails.incubationCompleteAt,
                laidTime: eggDetails.laidTime,
                subSpecies:subSpeciesName(eggDetails.species),
                offer:[]
            }
            if (alert == true) setAlert('Egg Details: '+ JSON.stringify(egg), 'success')

            return egg

        } catch (err) {
            console.log("Error at: getEgg" + err)
            const errMsg = getErrors('getAllEggIds', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getUserEggs(from,to) {        
        let allEggs = await this.getEggIds(from,to)                
        let eggs = []        
        
        for (let i = 0; i < allEggs.tokenIds.length; i++) {
            let eggDetails = await this.getEgg(allEggs.tokenIds[i])                                        
            let incubationTime = (eggDetails.incubation == '0') ? null : await this.checkIncubation(allEggs.tokenIds[i], false)
            eggDetails.incubationTime = incubationTime
            eggs.push(eggDetails)
        }
        eggs.totalOwned = allEggs.totalOwned
        userEggs.set(eggs)
    }

    async startIncubation(eggIds) {

        eggIds = eggIds.split(',')        
        try {
            await this.contract.EggToken.methods.startIncubation(eggIds).send({}, async function (err, txHash) {
                addAwaiter(txHash,'Incubation tokenId: ' + JSON.stringify(eggIds))
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Incubation Started for Egg id: ' + eggIds, 'success')              
                    return txHash
                }
            })
        } catch (err) {
            setAlert('Error starting Incubation for this Egg', 'warning')
            console.log("Error at: startIncubation" + err)
        }
    }

    async checkIncubation(eggId, msg = true) {

        try {
            let incubationTime = await this.contract.EggToken.methods.checkIncubation(eggId).call()

            if (msg == true) setAlert('Incubation time for this Egg is :' + incubationTime, 'info')

            return incubationTime

        } catch (err) {
            let errMsg = getErrors('checkIncubation', err)

            if (msg == true) setAlert(errMsg, 'warning')

            if (errMsg == "Incubation not started") return "-1";
        }
    }

    async hatch(eggId) {
        eggId = eggId.split(',')        

        try {
            await this.contract.EggToken.methods.hatch(eggId).send({}, function (err, txHash) {
                addAwaiter(txHash,'Hatching egg Id: ' + JSON.stringify(eggId))
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: Hatch function" + err)
        }
    }

    async getEvents(){
        return this.contract.EggToken.events
    }


    async totalSupply() {

        try {
            const totalSupply = await this.contract.EggToken.methods.getGen0Limit().call()
            setAlert('Total Gen-0 Egg Supply : ' + totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: totalSupply " + err)
        }
    }

    async currentSupply() {

        try {
            const totalSupply = await this.contract.EggToken.methods.totalSupply().call()
            setAlert('Current Egg Supply : ' + totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: currentSupply " + err)
        }
    }

    async getAmountEggsMinted() {
        try {
            const totalEggsMinted = await this.contract.EggToken.methods.getAmountEggsMinted().call()
            setAlert('Total Eggs Minted (incl. from breeding): ' + totalEggsMinted, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: getAmountEggsMinted " + err)
        }
    }

    async getAmountGen0EggsMinted() {
        try {
            const totalGen0EggsMinted = await this.contract.EggToken.methods.getAmountGen0EggsMinted().call()
            setAlert('Total Gen-0 Eggs Minted : ' + totalGen0EggsMinted, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: getAmountGen0EggsMinted " + err)
        }
    }

    async getRace() {
        try {
            const contractAddress = await this.contract.EggToken.methods.getRace().call()
            setAlert("Race's contract Address (DragonToken): " + contractAddress, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: getRace " + err)
        }
    }

}

