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

    async mintGen0Egg(amount) {

        try {
            await this.contract.EggToken.methods.mintGen0EggsTo(this.contract.account,amount,EggSize.Medium).send({}, function (err, txHash) {
                addAwaiter(txHash,'Minting Gen 0 Egg')
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: mintGen0Egg" + err)
        }
    }

    async getEgg(eggId,message = false) {
 
        try {
            let eggDetails = await this.contract.EggToken.methods.getEgg(eggId).call()
            
            if(message == true) setAlert(eggDetails,'success')
            return {
                tokenId: eggId,
                eggSize:eggDetails.size,
                mumId: eggDetails.mumId,
                dadId: eggDetails.dadId,
                incubation: eggDetails.incubationCompleteAt,
                laidTime: eggDetails.laidTime,
                subSpecies:subSpeciesName(eggDetails.species),
                offer:[]
            }

        } catch (err) {
            setAlert('Error getting this egg id ', 'warning')
            console.log("Error at: cgetEgg" + err)
        }
    }

    async getEggIds(
        startIndex,
        endIndex
    ) {
        try {
            let eggsIds = await this.contract.EggToken.methods.getEggIds(this.contract.account, startIndex, endIndex).call()                  
            return eggsIds
        } catch (err) {
            setAlert('getEggIds error', 'warning')
            console.log("Error at: getEggIds" + err)
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

    /************* STANDARD CONTRACT FUNCTIONS  ***************/

    async currentSupply() {

        try {
            let _totalSupply = await this.contract.EggToken.methods.totalSupply().call()
            setAlert('Current Supply : ' + _totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: currentSupply " + err)
        }
    }

    async totalSupply() {

        try {
            let _totalSupply = await this.contract.EggToken.methods.getGen0Limit().call()
            setAlert('Total Supply : ' + _totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: totalSupply " + err)
        }
    }
}



