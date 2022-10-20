import { get } from 'svelte/store';
import { setAlert } from "$lib/storage/alerts";
import { dragonApproval } from '$lib/storage/dragon'
import { eggApproval } from '$lib/storage/eggs'
import { approvalRequired } from "$lib/interfaces/ICave"
import { contracts } from "./contracts";

export const TokenType = { Unknown: 0, Dna: 1, Egg: 2, Dragon: 3 }

export class MarketApproval {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();      
            return this;
        })();
    }

    // APPROVAL FUNCTIONS
    async approveToken(tokenId, _tokenType) {
        switch (_tokenType) {
            case TokenType.Dragon:
                return this.approveDragon(tokenId)                
            case TokenType.Egg:
                return this.approveEgg(tokenId)                
        }
    }

    async approveDragon(tokenId) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.approve(
                this.contract.address.Marketplace,
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' approved', 'success')
                    return true
                }
            })
            return dragonsIds
        } catch (err) {
            setAlert('ApproveToken error ', 'warning')
            console.log('Error at: approveToken ' + err)
            return false;
        }
    }

    async approveEgg(tokenId) {
        try {
            let EggsIds = await this.contract.EggToken.methods.approve(
                this.contract.address.Marketplace,
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' approved', 'success')
                    return true
                }
            })
            return EggsIds
        } catch (err) {
            setAlert('ApproveToken error ', 'warning')
            console.log('Error at: approveToken ' + err)
            return false;
        }
    }

    async revokeToken(tokenId, _tokenType) {
        switch (_tokenType) {
            case TokenType.Dragon:
                this.revokeDragonToken(tokenId)
                break;
            case TokenType.Egg:
                this.revokeEggToken(tokenId)
                break;
        }
    }

    async revokeDragonToken(tokenId) {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.approve(
                "0x0000000000000000000000000000000000000000",
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' revoked', 'success')
                    return true
                }
            })
            return dragonsIds
        } catch (err) {
            setAlert('revokeToken error ', 'warning')
            console.log('Error at: revokeToken ' + err)
            return false;
        }
    }

    async revokeEggToken(tokenId) {
        try {
            let Eggs = await this.contract.EggToken.methods.approve(
                "0x0000000000000000000000000000000000000000",
                tokenId
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('Token ' + tokenId + ' revoked', 'success')
                    return true
                }
            })
            return Eggs
        } catch (err) {
            setAlert('revokeToken error ', 'warning')
            console.log('Error at: revokeToken ' + err)
            return false;
        }
    }

    async approveForAll(_tokenType) {
        switch (_tokenType) {
            case TokenType.Dragon:
                return this.approveAllDragons()                
            case TokenType.Egg:
                return this.approveAllEggs()                
        }
    }

    async approveAllDragons() {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                true
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    dragonApproval.set(true)
                    setAlert('Maketplace approved for all', 'success')
                    return true
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
            return false
        }
    }

    async approveAllEggs() {
        try {
            let EggsIds = await this.contract.EggToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                true
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    eggApproval.set(true)
                    setAlert('Maketplace approved for all', 'success')
                    return true
                }
            })
            return EggsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
            return false
        }
    }

    async removeApproveForAll(_tokenType) {
        switch (_tokenType) {
            case TokenType.Dragon:
                this.removeApproveForAllDragons()
                break;
            case TokenType.Egg:
                this.removeApproveForAllEggs()
                break;
        }
    }
    
    async removeApproveForAllDragons() {
        try {
            let dragonsIds = await this.contract.DragonToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                false
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    dragonApproval.set(false)
                    setAlert('Maketplace approved for all removed!', 'success')
                    return txHash
                }
            })

            return dragonsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
        }
    }

    async removeApproveForAllEggs() {
        try {
            let EggsIds = await this.contract.EggToken.methods.setApprovalForAll(
                this.contract.address.Marketplace,
                false
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    eggApproval.set(false)
                    setAlert('Maketplace approved for all removed!', 'success')
                    return txHash
                }
            })
            return EggsIds
        } catch (err) {
            setAlert('setApprovalForAll error ', 'warning')
            console.log('Error at: setApprovalForAll ' + err)
        }
    }

    async getApproved(tokenId,_tokenType, msg = false) {
        switch (_tokenType) {
            case TokenType.Dragon:
                return this.getApprovedDragon(tokenId, msg)                
            case TokenType.Egg:
                return this.getApprovedEgg(tokenId, msg)            
        }
    }

    async getApprovedDragon(tokenId, msg = false) {

        let isApproved
        const contractAddress = this.contract.address.Marketplace

        try {
            await this.contract.DragonToken.methods.getApproved(tokenId).call({}, (err, approved) => {

                if (err) console.log(err)
                if (contractAddress == approved) {
                    if (msg == true) setAlert(tokenId + ' is approved', 'success')
                    isApproved = true;
                } else {
                    if (msg == true) setAlert(tokenId + ' is not approved', 'warning')
                    isApproved = false
                }
            })
        }
        catch (err) {
            console.log("Error from singleApprove(): " + err)
        }
        return isApproved
    }

    async getApprovedEgg(tokenId, msg = false) {

        let isApproved
        const contractAddress = this.contract.address.Marketplace

        try {
            await this.contract.EggToken.methods.getApproved(tokenId).call({}, (err, approved) => {

                if (err) console.log(err)
                if (contractAddress == approved) {
                    if (msg == true) setAlert(tokenId + ' is approved', 'success')
                    isApproved = true;
                } else {
                    if (msg == true) setAlert(tokenId + ' is not approved', 'warning')
                    isApproved = false
                }
            })
        }
        catch (err) {
            console.log("Error from singleApprove(): " + err)
        }
        return isApproved
    }

    async isApprovedForAll(_tokenType,msg = false) {            
        switch (_tokenType) {
            case TokenType.Dragon :                
                this.isApprovedForAllDragons(msg)
                break;
            case TokenType.Egg :                
                this.isApprovedForAllEggs(msg)
                break;
        }    
    }

    async isApprovedForAllDragons(msg = false) {

        try {
            const isMarketplaceAnOperator = await this.contract.DragonToken.methods.isApprovedForAll(this.contract.account, this.contract.address.Marketplace).call()

            if (isMarketplaceAnOperator == true) {
                
                let _approvalRequired = get(approvalRequired)
                _approvalRequired.dragon = false
                approvalRequired.set(_approvalRequired)
                dragonApproval.set(true)

                if (msg == true) setAlert('This account is Aprrove for All', 'success')
            } else {
                if (msg == true) setAlert('Not approve for All', 'warning')
            }
            return isMarketplaceAnOperator
        } catch (error) {
            setAlert('Contract error, please check metamask account and connection', 'warning')
        }
    }

    async isApprovedForAllEggs(msg = false) {

        try {
            const isMarketplaceAnOperator = await this.contract.EggToken.methods.isApprovedForAll(this.contract.account, this.contract.address.Marketplace).call()

            if (isMarketplaceAnOperator == true) {
                
                let _approvalRequired = get(approvalRequired)
                _approvalRequired.egg = false
                approvalRequired.set(_approvalRequired)
                eggApproval.set(true)
                if (msg == true) setAlert('This account is Aprrove for All', 'success')
            } else {
                if (msg == true) setAlert('Not approve for All', 'warning')
            }
            return isMarketplaceAnOperator
        } catch (error) {
            setAlert('Contract error, please check metamask account and connection', 'warning')
        }
    }
}



