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
            
            dragons.push(dragonDetails)
        }
        userDragons.set(dragons)        
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



