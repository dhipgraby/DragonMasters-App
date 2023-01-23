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

    async getDragonIds(owner, startIndex, endIndex, alert = false){
        try {
            const dragonIds = await this.contract.DragonToken.methods.getDragonIds(owner, startIndex, endIndex).call()
            console.log(dragonIds)
            if (alert == true) setAlert('Dragon Ids: '+ JSON.stringify(dragonIds), 'success')

            return dragonsIds
        } catch (err) {
            if (alert == true) setAlert('getDragonIds error', 'warning')
            console.log("Error at: getDragonIds" + err)
        }
    }

    async getDragon(dragonId, alert = false) {
        
        try {
            let dragonDetails = await this.contract.DragonToken.methods.getDragon(dragonId).call()            
            const toNumbers2D = arr => arr.map(arr => arr.map(Number));
            dragonDetails = {
                ...dragonDetails[0], skills: toNumbers2D(dragonDetails[1])
            }

            const dragon = {
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
            if (alert == true) setAlert('Error getting this Dragon id ', 'warning')
            console.log("Error at: getDragon" + err)
        }
    }

    async checkEnergy(dragonId, alert = false) {
        try {
            const timeToFullEnergy = await this.contract.DragonToken.methods.checkEnergy(dragonId).call()

            if (timeToFullEnergy == 0) {
                if (alert == true) setAlert('Dragon has full energy!', 'success')
            } else {
                if (alert == true) setAlert('Dragon will regain full energy in ' + timeToFullEnergy + ' seconds', 'info')
            }
            return timeToFullEnergy

        } catch (err) {
            // let errMsg = getErrors('checkEnergy', err)
            if (alert == true) setAlert('checkEnergy error', 'warning')

            console.log("Error at: checkEnergy " + err)
        }
    }

    async checkMaturity(dragonId, alert = false) {
        try {
            const maturity = await this.contract.DragonToken.methods.checkMaturity(dragonId).call()
            let secondsToMature = maturity.secondsRemaining

            if (secondsToMature == 0) {
                if (alert == true) setAlert('This dragon is mature and ready to be raised!', 'success')
            } else {
                if (alert == true) setAlert('Dragon will mature in ' + secondsToMature + ' seconds', 'info')
            }
            return secondsToMature

        } catch (err) {
            // let errMsg = getErrors('checkMaturity', err)
            if (alert == true) setAlert('checkMaturity error', 'warning')

            console.log("Error at: checkMaturity " + err)
        }
    }

    async getRelationship(dragonId, toDragonId, alert = false) {
        try {
            const relationship = await this.contract.DragonToken.methods.getRelationship(dragonId, toDragonId).call()
            console.log(relationship)
            if (alert == true) setAlert('Relationship: '+ JSON.stringify(relationship), 'success')

            return relationship
        } catch (err) {
            console.log("Error at: getRelationship function" + err)
            if (alert == true) setAlert('getRelationship error', 'warning')
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

    async breed(idDragonMateA, idDragonMateB, alert = false) {
        const mateAsIds = idDragonMateA.split(',')
        const mateBsIds = idDragonMateB.split(',')
        try {
            console.log("In breed(), with mate A & B ids:")
            console.log(mateAsIds)
            console.log(mateBsIds)

            await this.contract.DragonToken.methods.breed(mateAsIds, mateBsIds).send({}, function (err, txHash) {
                addAwaiter(txHash,'Breeding Ids: ' + JSON.stringify(mateAsIds) +' - ' + JSON.stringify(mateBsIds))
                if (alert == true && err) setAlert(err, 'warning')
                else {
                    if (alert == true) setAlert('Breeding complete', 'success')
                    return txHash
                }
            })
        } catch (err) {
            console.log("Error at: Breeding function" + err)
            if (alert == true) setAlert('breed error', 'warning')
        }
    }



      /*
    * Get a dragon's current skills
    * Requirement: The dragon (id) must exist
    * Returns: List of skill identifiers (enum Skill identifiers).
    */
    //   function getSkills(uint256 dragonId)
    //   external
    //   view
    //   returns (Skill[] memory skills);

    /*
    * Get the dragon's skill level for a specific skill (enum Skill identifier)
    * Requirement: The dragon (id) must exist
    * Returns: Skill level (0-255)
    */
    // function getSkillLevel(uint256 dragonId, Skill skill)
    //     external
    //     view
    //     returns (uint8 level);

    /*
    * Get the dragon's skills with associsated skill levels
    * Requirement: The dragon (id) must exist
    * Returns: List of each Skill (enum identifier) with it's corresponding skill level (0-255)
    */
    // function getSkillsWithLevels(uint256 dragonId)
    //     external
    //     view
    //     returns (uint8[][2] memory skills);


    /************* PUBLIC FUNCTIONS  ***************/

    // Public functions

    // Functions to pause or unpause all functions that have
    // the whenNotPaused or whenPaused modify applied on them
    // function pause() public onlyOwner whenNotPaused {
    //     _pause();
    // }

    // function unpause() public onlyOwner whenPaused {
    //     _unpause();
    // }


    // function setAttributeGrowth(
    //     uint8[_NUM_ATTRIBUTES][_NUM_MATURITIES][_NUM_SUBSPECIES] calldata attributesValues
    // )
    //     public
    //     onlyOwner
    //     whenNotPaused
    // {
    //     _AttributeGrowth = attributesValues;
    // }


    // function setBaseSkillGrowth(
    //     uint8[_NUM_BASESKILLS][_NUM_MATURITIES][_NUM_SUBSPECIES] calldata skillsValues
    // )
    //     public
    //     onlyOwner
    //     whenNotPaused
    // {
    //     _BaseSkillGrowth = skillsValues;
    // }


    // function getAttributeGrowth()
    //     public
    //     view
    //     onlyOwner
    //     returns (uint8[_NUM_ATTRIBUTES][_NUM_MATURITIES][_NUM_SUBSPECIES] memory attributesValues)
    // {
    //     return(_AttributeGrowth);
    // }

    // function getBaseSkillGrowth()
    //     public
    //     view
    //     onlyOwner
    //     returns (uint8[_NUM_BASESKILLS][_NUM_MATURITIES][_NUM_SUBSPECIES] memory skillsValues)
    // {
    //     return(_BaseSkillGrowth);
    // }


    // function getDnaTokenContract()
    //     public
    //     view
    //     returns (address)
    // {
    //     return address(_IDna);
    // }


    // function getEggTokenContract()
    //     public
    //     view
    //     returns (address)
    // {
    //     return address(_IEgg);
    // }


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



