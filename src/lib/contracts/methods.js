import { setAlert } from "$lib/storage/alerts";
import { contracts } from "./contracts";

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
  }
 