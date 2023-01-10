// @ts-nocheck
import { setAlert,addAwaiter } from "$lib/storage/alerts";
import { userDragons } from "$lib/storage/dragon";
import { subSpeciesName } from "$lib/helpers/utils"
import { contracts } from "./contracts";
import { getErrors } from "./errorHandling";

const Relationship = {
    None: 0, ExPartner: 1, Oneself: 2, Mother: 3,
    Father: 4, Child: 5, FullSibling: 6, HalfSibling: 7,
    GrandmotherOnMumsSide: 8, GrandmotherOnDadsSide: 9,
    GrandfatherOnMumsSide: 10, GrandfatherOnDadsSide: 11,
    Grandchild: 12, UncleAuntOnMumsSide: 13, UncleAuntOnDadsSide: 14,
    NephewNeice: 15, GrandNephewNeice: 16, FirstCousin: 17,
    FirstCousinOnceRemoved: 18, FirstCousinTwiceRemoved: 19
}
Object.freeze(Relationship);

export class DragonContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }

    async getDragon(dragonId, alert = false) {
        
        try {
            let dragonDetails = await this.contract.DragonToken.methods.getDragon(dragonId).call()            
            const toNumbers2D = arr => arr.map(arr => arr.map(Number));
            dragonDetails = {
                ...dragonDetails[0], skills: toNumbers2D(dragonDetails[1])
            }

            let dragon = {
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
                offer:[]
            }

            if (alert == true) setAlert('Dragon Details: '+ JSON.stringify(dragon), 'success')

            return dragon

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

    async getUserDragons(from, to) {

        let allDragons = await this.getDragonIds(from, to)
        let dragons = []
        // let dragonOffers = get(dragonsForSale)
        for (let i = 0; i < allDragons.tokenIds.length; i++) {

            let dragonDetails = await this.getDragon(allDragons.tokenIds[i])
            dragonDetails['dna'] = await this.getDna(dragonDetails.dnaId)
            // if(dragonOffers.length){
                
            //     let offerIds = temp1.map((el)=>{
            //         return el.tokenId 
            //     })
            // if(allDragons.tokenIds[i].includes(offerIds))  {
            //     dragonDetails['forSale'] = true
            // }

            // }
            dragons.push(dragonDetails)
        }
        dragons.totalOwned = allDragons.totalOwned
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

    async checkEnergy(dragonId, msg = false) {
        try {
            let energy = await this.contract.DragonToken.methods.checkEnergy(dragonId).call()

            if (energy == 0) {
                if (msg == true) setAlert('This dragon have full energy!', 'success')
            } else {
                if (msg == true) setAlert('Dragon energy: ' + energy, 'info')
            }
            return energy

        } catch (err) {
            let errMsg = getErrors('checkEnergy', err)
            console.log("Error at: checkEnergy " + errMsg)
        }
    }

    async checkMaturity(dragonId, msg = false) {
        try {
            let maturity = await this.contract.DragonToken.methods.checkMaturity(dragonId).call()
            let secondsRemaining = maturity.secondsRemaining

            if (secondsRemaining == 0) {
                if (msg == true) setAlert('This dragon is Mature ready to Raise!', 'success')
            } else {
                if (msg == true) setAlert('Dragon Matures at : ' + secondsRemaining, 'info')
            }
            return secondsRemaining

        } catch (err) {
            let errMsg = getErrors('checkMaturity', err)
            console.log("Error at: checkMaturity " + errMsg)
        }
    }

    async raiseMaturity(dragonId) {
        dragonId = dragonId.split(',')
        try {
            await this.contract.DragonToken.methods.raiseMaturity(dragonId).send({}, function (err, txHash) {
                addAwaiter(txHash,'Raise dragon Id: ' + JSON.stringify(dragonId))
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

    async breed(idDragonMateA, idDragonMateB) {
        idDragonMateA = idDragonMateA.split(',')
        idDragonMateB = idDragonMateB.split(',')
        try {
            await this.contract.DragonToken.methods.breed(idDragonMateA, idDragonMateB).send({}, function (err, txHash) {
                addAwaiter(txHash,'Breeding Ids: ' + JSON.stringify(idDragonMateA) +' - ' + JSON.stringify(idDragonMateB))
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

    async getRelationship(dragonId, toDragonId) {
        try {
            let relationship = await this.contract.DragonToken.methods.getRelationship(dragonId, toDragonId).call()
            console.log(relationship)
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



