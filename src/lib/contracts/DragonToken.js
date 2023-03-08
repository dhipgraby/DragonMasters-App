// @ts-nocheck
import { setAlert, addAwaiter } from "$lib/storage/alerts";
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

const Maturity = {
    Hatchling: 0, Juvenile: 1, Adult: 2, Veteran: 3, Elder: 4, Ancient: 5, Immortal: 6
}
Object.freeze(Maturity);

const Attribute = {
    Strength: 0, Endurance: 1, Agility: 2, Charisma: 3, Intelligence: 4, Wisdom: 5
}
Object.freeze(Attribute);

const Skill = { //Base Skills
    Attack: 0, Defend: 1, Run: 2, Climb: 3, Jump: 4, Fly: 5, Swim: 6, Dig: 7
}
Object.freeze(Skill);


export class DragonContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }


    async getDragonIds(owner, startIndex, endIndex, alert = false) {
        try {
            const dragonIds = await this.contract.DragonToken.methods.getDragonIds(owner, startIndex, endIndex).call()
            if (alert == true) setAlert('Dragon Ids: ' + JSON.stringify(dragonIds), 'success')
            return dragonIds
        } catch (err) {
            // if (alert == true) setAlert('getDragonIds error', 'warning')
            console.log("Error at: getDragonIds", err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
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
                offer: []
            }

            if (alert == true) setAlert('Dragon Details: ' + JSON.stringify(dragon), 'success')

            return dragon

        } catch (err) {
            // if (alert == true) setAlert('Error getting this Dragon id ', 'warning')
            // console.log("Error at: getDragon" + err)
            const errMsg = getErrors('getDragon', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
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
            // if (alert == true) setAlert('checkEnergy error', 'warning')
            // console.log("Error at: checkEnergy " + err)
            // const errMsg = getErrors('checkEnergy', err)
            if (alert == true) setAlert(err, 'warning')
            console.log(err)
        }
    }

    async checkMaturity(dragonId, alert = false) {
        try {
            const maturity = await this.contract.DragonToken.methods.checkMaturity(dragonId).call()
            const secondsToMature = maturity.secondsRemaining
            const currentMaturity = Object.keys(Maturity)[maturity.currentAgeGroup]

            if (secondsToMature == 0) {
                if (alert == true) setAlert('This dragon is a mature ' +
                    currentMaturity + ' and is ready to be raised!', 'success')
            } else {
                if (alert == true) setAlert('Dragon is an immature ' +
                    currentMaturity + ' but will mature in ' +
                    secondsToMature + ' seconds', 'info')
            }
            return secondsToMature

        } catch (err) {
            // if (alert == true) setAlert('checkMaturity error', 'warning')
            // console.log("Error at: checkMaturity " + err)
            const errMsg = getErrors('checkMaturity', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getRelationship(dragonId, toDragonId, alert = false) {
        try {
            const relationship = await this.contract.DragonToken.methods.getRelationship(dragonId, toDragonId).call()
            const relation = Object.keys(Relationship)[relationship]
            if (alert == true) setAlert('Dragon A is ' + relation + ' of dragon B', 'success')
            console.log(relationship, ':', relation)

            return relationship
        } catch (err) {
            // console.log("Error at: getRelationship function" + err)
            // if (alert == true) setAlert('getRelationship error', 'warning')
            const errMsg = getErrors('getRelationship', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getSkills(dragonId, alert = false) {
        try {
            const dragonsSkillIds = await this.contract.DragonToken.methods.getSkills(dragonId).call()

            const allSkillNames = Object.keys(Skill)
            let dragonsSkills = ''
            for (let i = 0; i < dragonsSkillIds.length; i++) {
                dragonsSkills += allSkillNames[dragonsSkillIds[i]]
                if (i < dragonsSkillIds.length - 1) dragonsSkills += ', '
                if (i + 1 == dragonsSkillIds.length - 1) dragonsSkills += 'and '
            }
            if (alert == true) setAlert('Dragon has skills: ' + dragonsSkills, 'success')

            return dragonsSkillIds

        } catch (err) {
            const errMsg = getErrors('getSkills', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getSkillLevel(dragonId, skill, alert = false) {
        try {
            const level = await this.contract.DragonToken.methods.getSkillLevel(dragonId, skill).call()

            const skillName = Object.keys(Skill)[skill]
            if (alert == true)
                setAlert("Dragon's " + skillName + ' skill = ' + level, 'success')

            return level

        } catch (err) {
            const errMsg = getErrors('getSkillLevel', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async getSkillsWithLevels(dragonId, alert = false) {
        try {
            const skillsWithLevels = await this.contract.DragonToken.methods.getSkillsWithLevels(dragonId).call()

            const allSkillNames = Object.keys(Skill)
            let dragonsSkillsWithLevels = ''
            for (let i = 0; i < skillsWithLevels[0].length; i++) {
                const nextSkillwithLevel = allSkillNames[skillsWithLevels[0][i]] + '=' + skillsWithLevels[1][i]
                dragonsSkillsWithLevels += nextSkillwithLevel
                if (i < skillsWithLevels[0].length - 1) dragonsSkillsWithLevels += ', '
                if (i + 1 == skillsWithLevels[0].length - 1) dragonsSkillsWithLevels += 'and '
            }
            if (alert == true) setAlert('Dragon has skills: ' + dragonsSkillsWithLevels, 'success')

            return skillsWithLevels

        } catch (err) {
            const errMsg = getErrors('getSkillsWithLevels', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async raiseMaturity(ids, alert = false) {
        try {
            const dragonIds = ids.split(',')

            await this.contract.DragonToken.methods.raiseMaturity(dragonIds).send({}, function (err, txHash) {
                addAwaiter(txHash, 'Raise maturity Ids: ' + JSON.stringify(dragonIds))
                if (alert == true) {
                    if (err) {
                        setAlert(err, 'warning')
                        console.log('Awaiter err: ', err)
                    }
                    else {
                        setAlert('Raise Maturity Tx: ' + txHash, 'success')
                    }
                }
                return txHash
            })
        } catch (err) {
            // console.log("Error at: raiseMaturity function" + err)
            // if (alert == true) setAlert('raiseMaturity error', 'warning')
            const errMsg = getErrors('raiseMaturity', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async breed(idDragonMateA, idDragonMateB, alert = false) {
        try {
            const mateAsIds = idDragonMateA.split(',')
            const mateBsIds = idDragonMateB.split(',')

            await this.contract.DragonToken.methods.breed(mateAsIds, mateBsIds).send({}, function (err, txHash) {
                addAwaiter(txHash, 'Breed mate Ids: ' + JSON.stringify(mateAsIds) + ' - ' + JSON.stringify(mateBsIds))
                if (alert == true) {
                    if (err) {
                        setAlert(err, 'warning')
                        console.log('Awaiter err: ', err)
                    }
                    else {
                        setAlert('Breed Tx: ' + txHash, 'success')
                    }
                }
                return txHash
            })
        } catch (err) {
            console.log("Error at: Breeding function" + err)
            if (alert == true) setAlert('breed error', 'warning');
            //const errMsg = getErrors('breed', err);
            //if (alert == true) setAlert(errMsg, 'warning');            
        }
    }


    // Admin Functions (eecutable by DragonToken contract owner)

    async pause(alert = false) {
        try {
            await this.contract.DragonToken.methods.pause().send({}, function (err, txHash) {
                addAwaiter(txHash, 'Pause DragonToken contract')
                if (alert == true) {
                    if (err) setAlert(err, 'warning')
                    else {
                        setAlert(txHash, 'success')
                        return txHash
                    }
                }
            })
        } catch (err) {
            // console.log("Error at: pause function" + err)
            // if (alert == true) setAlert('pause error', 'warning')
            const errMsg = getErrors('pause', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }

    async unpause(alert = false) {
        try {
            await this.contract.DragonToken.methods.unpause().send({}, function (err, txHash) {
                addAwaiter(txHash, 'Unpause DragonToken contract')
                if (alert == true) {
                    if (err) setAlert(err, 'warning')
                    else {
                        setAlert(txHash, 'success')
                        return txHash
                    }
                }
            })
        } catch (err) {
            // console.log("Error at: unpause function" + err)
            // if (alert == true) setAlert('unpause error', 'warning')
            const errMsg = getErrors('unpause', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }




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
            setAlert("Dragon Token's Total Supply : " + _totalSupply, 'info')
        } catch (err) {
            // setAlert(err, 'warning')
            // console.log("Error at: totalSupply " + err)
            const errMsg = getErrors('totalSupply', err)
            if (alert == true) setAlert(errMsg, 'warning')
            console.log(errMsg)
        }
    }


    // KENNETH'S FUNCTIONS - Q. ARE THESE NEEDED FOR APP?  IF NOT DELETE THEM!??

    async getUserDragons(from, to) {

        const allDragons = await this.getDragonIds(this.contract.account, from, to)
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
            const errMsg = getErrors('getDna', err)
            console.log(errMsg)
        }
    }

    async ownerOf(tokenId) {
        try {
            let owner = await this.contract.DragonToken.methods.ownerOf(tokenId).call()
            return owner
        } catch (err) {
            const errMsg = getErrors('ownerOf: ', err)
            console.log(errMsg)
        }
    }

}
