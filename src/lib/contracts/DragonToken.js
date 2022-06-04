import { setAlert } from "$lib/storage/alerts";
import { userDragons }  from "$lib/storage/dragon";
import { subSpeciesName } from "$lib/helpers/utils"
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

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
            const toNumbers2D = arr => arr.map(arr => arr.map(Number)); 
            dragonDetails = { ...dragonDetails[0], skills: toNumbers2D(dragonDetails[1])}            
            
            return {
                tokenId:dragonId,                
                dnaId: dragonDetails.dnaId,
                subSpecies: subSpeciesName(dragonDetails.subSpecies), 
                fullEnergyAt: dragonDetails.fullEnergyAt,
                ageGroup: dragonDetails.age.group,
                birthTime: dragonDetails.age.birthTime,              
                maturesAt: dragonDetails.age.maturesAt,    
                mumId:0,                          
                dadId:0,
                skills:dragonDetails.skills,
                attributes:dragonDetails.attributes,
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

        let allDragons = await this.getDragonIds(10, 20)
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

    async checkEnergy(dragonId, msg = false){
        try {
            let energy = await this.contract.DragonToken.methods.checkEnergy(dragonId).call()                                    
           
            if(energy == 0){
               if(msg == true) setAlert('This dragon have full energy!','success')        
            } else {
                if(msg == true) setAlert('Dragon energy: ' + energy,'info')   
            }
            return energy

        } catch (err) {            
            let errMsg = getErrors('checkEnergy', err)
            console.log("Error at: checkEnergy " + errMsg)
        }
    }

    
    async checkMaturity(dragonId, msg = false){
        try {
            let maturity = await this.contract.DragonToken.methods.checkMaturity(dragonId).call()                        
            let secondsRemaining = maturity.secondsRemaining
           
            if(secondsRemaining == 0){
                if(msg == true) setAlert('This dragon is Mature ready to Raise!','success')        
            } else {
                if(msg == true)  setAlert('Dragon Matures at : ' + secondsRemaining,'info')   
            }
            return secondsRemaining

        } catch (err) {            
            let errMsg = getErrors('checkMaturity', err)
            console.log("Error at: checkMaturity " + errMsg)
        }
    }

    async raiseMaturity(dragonId){
        try {
            await this.contract.DragonToken.methods.raiseMaturity(dragonId).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: raiseMaturity function" + err)
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



