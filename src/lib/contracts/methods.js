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

    async startIncubation(eggId) {
   
        try {    
            await this.contract.EggToken.methods.startIncubation(eggId).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert(txHash, 'success')
                    return txHash
                }
            })
        } catch (err) {
            setAlert('Error starting Incubation for this Egg', 'warning')
            console.log("Error at: mintGen0Egg" + err)
        }
    }

    async checkIncubation(eggId) {
   
        try {    
            let incubationTime = await this.contract.EggToken.methods.checkIncubation(eggId).call()
            console.log(incubationTime)
        } catch (err) {
            setAlert('Incubation time to avaiable for this Egg', 'warning')
            console.log("Error at: checking incubationTime" + err)
        }
    }
  }



  
  