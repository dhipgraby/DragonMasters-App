import { setAlert } from "$lib/storage/alerts";
import { userEggs } from "$lib/storage/eggs";
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

const SubSpecies = {
    Unknown:0,
    Earth:1,
    Fire:2,
    Air:3,
    Water:4
}

function subSpeciesName(SubSpecies){

    let speciesName = ""

    switch(SubSpecies){
        case "1" :
            speciesName = 'Earth'
        break;           
        case "2" :
            speciesName = 'Fire'
        break;           
        case "3" :
            speciesName = 'Air'
        break;             
        case "4" :
            speciesName = 'Water'
        break;           
    }
    return speciesName
}

Object.freeze(SubSpecies)

export class EggContract {
    constructor() {
        this.contract
        return (async () => {

            this.contract = await contracts();
            return this;
        })();
    }

    async mintGen0Egg() {

        try {
            await this.contract.EggToken.methods.mintGen0EggTo(this.contract.account).send({}, function (err, txHash) {
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

    async getEgg(eggId) {

        try {
            let eggDetails = await this.contract.EggToken.methods.getEgg(eggId).call()
            
            return {
                tokenId: eggId,
                mumId: eggDetails.mumId,
                dadId: eggDetails.dadId,
                incubation: eggDetails.incubationCompleteAt,
                laidTime: eggDetails.laidTime,
                subSpecies:subSpeciesName(eggDetails.subSpecies)
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

    async getUserEggs() {

        let allEggs = await this.getEggIds(0, 20)
        let eggs = []

        for (let i = 0; i < allEggs.tokenIds.length; i++) {
            let eggDetails = await this.getEgg(allEggs.tokenIds[i])          
            console.log(eggDetails)              
            let incubationTime = (eggDetails.incubation == '0') ? null : await this.checkIncubation(allEggs.tokenIds[i], false)
            eggDetails.incubationTime = incubationTime
            eggs.push(eggDetails)
        }

        userEggs.set(eggs)
    }

    async startIncubation(eggId) {

        try {
            await this.contract.EggToken.methods.startIncubation(eggId).send({}, async function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Incubation Started for Egg id: ' + eggId, 'success')              
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

        try {
            await this.contract.EggToken.methods.hatch(eggId).send({}, function (err, txHash) {
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

    /************* STANDARD CONTRACT FUNCTIONS  ***************/

    async totalSupply() {

        try {
            let _totalSupply = await this.contract.EggToken.methods.totalSupply().call()
            setAlert('Total Supply : ' + _totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: totalSupply " + err)
        }
    }
}



