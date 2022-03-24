import { setAlert } from "$lib/storage/alerts";
import { writable } from "svelte/store";
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

export const userDragons = writable([])

export class DragonContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }

    async getDragon(dragonId) {
        try {
            let dragonDetails = await this.contract.DragonToken.methods.getDragon(dragonId).call()

            return {
                tokenId:dragonId,
                ageGroup: dragonDetails.ageGroup,
                birthTime: dragonDetails.birthTime,
                dadId: dragonDetails.dadId,
                dnaId: dragonDetails.dnaId,
                fullEnergyAt: dragonDetails.fullEnergyAt,
                maturesAt: dragonDetails.maturesAt,
                mumId: dragonDetails.mumId
            }

        } catch (err) {
            setAlert('Error getting this Dragon id ', 'warning')
            console.log("Error at: getDragon" + err)
        }
    }

    async getDragonIds(
        startIndex,
        endIndex
    ) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.getDragonIds(this.contract.account, startIndex, endIndex).call()
            
            return dragonsIds
        } catch (err) {
            setAlert('getDragonIds error', 'warning')
            console.log("Error at: getDragonIds" + err)
        }
    }

    async getUserDragons() {

        let allDragons = await this.getDragonIds(0, 5)
        let dragons = []

        for (let i = 0; i < allDragons.tokenIds.length; i++) {

            let dragonDetails = await this.getDragon(allDragons.tokenIds[i])        
            
            dragonDetails['dna'] = await this.getDna(dragonDetails.dnaId)
            dragons.push(dragonDetails)
        }
        userDragons.set(dragons)                
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

    async checkEnergy(dragonId){
        try {
            let energy = await this.contract.DragonToken.methods.checkEnergy(dragonId).call()                                    
           
            if(energy == 0){
                setAlert('This dragon have full energy!','success')        
            } else {
                setAlert('Dragon energy: ' + energy,'info')   
            }
            return energy

        } catch (err) {            
            let errMsg = getErrors('checkEnergy', err)
            console.log("Error at: checkEnergy " + errMsg)
        }
    }

    
    async checkMaturity(dragonId){
        try {
            let maturity = await this.contract.DragonToken.methods.checkMaturity(dragonId).call()                        
            let secondsRemaining = maturity.secondsRemaining
           
            if(secondsRemaining == 0){
                setAlert('This dragon is Mature ready to Raise!','success')        
            } else {
                setAlert('Dragon Matures at : ' + secondsRemaining,'info')   
            }
            return secondsRemaining

        } catch (err) {            
            let errMsg = getErrors('checkMaturity', err)
            console.log("Error at: checkMaturity " + errMsg)
        }
    }

    async raiseHatchling(dragonId){
        try {
            await this.contract.DragonToken.methods.raiseHatchling(dragonId).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: raiseHatchling function" + err)
        }
    }

    async breed(idDragonMateA,idDragonMateB){
        try {
            await this.contract.DragonToken.methods.breed(idDragonMateA,idDragonMateB).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: Breeding function" + err)
        }
    }

    /************* STANDARD CONTRACT FUNCTIONS  ***************/

    async totalSupply() {

        try {
            let _totalSupply = await this.contract.DragonToken.methods.totalSupply().call()
            setAlert('Dragon Token Total Supply : ' + _totalSupply, 'info')
        } catch (err) {
            setAlert(err, 'warning')
            console.log("Error at: totalSupply " + err)
        }
    }

}



