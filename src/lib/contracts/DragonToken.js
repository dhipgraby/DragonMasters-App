import { setAlert } from "$lib/storage/alerts";
import { writable } from "svelte/store";
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

export const userDragon = writable([])

export class DragonContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
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



