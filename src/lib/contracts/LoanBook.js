import { setAlert } from "$lib/storage/alerts";
import { contracts } from "./contracts";


export const TokenType = { Unknown: 0, Dna: 1, Egg: 2, Dragon: 3 }
export const OfferType = { NoOffer: 0, ForSale: 1, ForRent: 2, ForSaleOrRent: 3 }

export class LoanBookContract {
    constructor() {
        this.contract
        return (async () => {
            this.contract = await contracts();
            return this;
        })();
    }

    async getOnLoan(
        startIndex,
        endIndex,
        tokenType,
        alert = false
    ) {

        let offers = []

        try {
            let ids = await this.contract.LoanBook.methods.getOnLoan(startIndex, endIndex, tokenType).call()
            let tokenIds = ids.tokenIds
            for (let i = 0; i < tokenIds.length; i++) {
                let currentOffer = await this.getLoan(ids.tokenIds[i], tokenType)
                offers.push(currentOffer)
            }

            if (alert == true) setAlert('Total Loans ' + ids.totalOnLoan + '.<p class="bold m-0">Token Ids: ' + tokenIds + '</p>', 'success')
            return offers

        } catch (err) {
            setAlert('getOnLoan error', 'warning')
            console.log("Error at: getOnLoan" + err)
        }
    }

    async getLoan(tokenId, tokenType, alert = false) {
        try {
            const Loan = await this.contract.LoanBook.methods.getLoan(tokenId, tokenType).call()
            if (alert == true) setAlert('Loan: ' + Loan, 'success')
            return Loan
        } catch (err) {
            if (alert == true) setAlert('getLoan error', 'warning')
            console.log("Error at: getLoan" + err)
        }
    }

    async isOnLoan(tokenId, tokenType, alert = false) {
        try {
            let onLoan = await this.contract.LoanBook.methods.isOnLoan(tokenId, tokenType).call()
            if (alert == true) setAlert('onLoan: ' + onLoan, 'warning')
            return onLoan
        } catch (err) {
            if (alert == true) setAlert('isonLoan error', 'warning')
            console.log("Error at: isonLoan" + err)
        }
    }

    async isLender(candidate, tokenId,tokenType, alert = false) {
        try {
            let is_lender = await this.contract.LoanBook.methods.isLender(
                candidate,
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('isLender: ' + is_lender, is_lender ? 'success' : 'warning')

            return is_lender
        } catch (err) {
            if (alert == true) setAlert('isLender error', 'warning')
            console.log("Error at: isLender" + err)
        }
    }
    
    async isBorrower(candidate, tokenId, tokenType, alert = false) {
        try {
            let is_borrower = await this.contract.LoanBook.methods.isBorrower(
                candidate,
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('isBorrower: ' + is_borrower, is_borrower ? 'success' : 'warning')

            return is_borrower
        } catch (err) {
            if (alert == true) setAlert('isBorrower error', 'warning')
            console.log("Error at: isBorrower" + err)
        }
    }

    async getBorrowedBy(
        borrower,
        startIndex,
        endIndex,
        tokenType,
        alert = false
    ) {
        try {
            const ids = await this.contract.LoanBook.methods.getBorrowedBy(borrower, startIndex, endIndex, tokenType).call()

            if (alert == true) setAlert('Borrowed tokens: ' + ids.totalBorrowed + '.<p class="bold m-0">Token Ids: ' + ids.tokenIds + '</p>', 'success')
            return ids.tokenIds

        } catch (err) {
            setAlert('getBorrowedBy error', 'warning')
            console.log("Error at: getBorrowedBy" + err)
        }
    }

    async getLoanedBy(
        lender,
        startIndex,
        endIndex,
        tokenType,
        alert = false
    ) {
        try {
            const ids = await this.contract.LoanBook.methods.getLoanedBy(lender, startIndex, endIndex, tokenType).call()

            if (alert == true) setAlert('Loaned tokens: ' + ids.totalLoaned + '.<p class="bold m-0">Token Ids: ' + ids.tokenIds + '</p>', 'success')
            return ids.tokenIds

        } catch (err) {
            setAlert('getLoanedBy error', 'warning')
            console.log("Error at: getLoanedBy" + err)
        }

    }

    async getNumOnLoan(tokenType) {
        try {
            let onLoan = await this.contract.LoanBook.methods.getNumOnLoan(tokenType).call()
            if (alert == true) setAlert('total loans: ' + onLoan, 'warning')
            return onLoan
        } catch (err) {
            if (alert == true) setAlert('getNumOnLoan error', 'warning')
            console.log("Error at: getNumOnLoan" + err)
        }
    }

    async returnLoan(
        to,
        tokenId,
        tokenType,
        alert
    ) {
        try {
            await this.contract.LoanBook.methods.returnLoan(
                to,
                tokenId,
                tokenType
            ).send({}, function (err, txHash) {
                if (err) setAlert(err, 'warning')
                else {
                    setAlert('New offer created!', 'success')
                    return txHash
                }
            })

        } catch (err) {
            if (alert == true) setAlert('isonLoan error', 'warning')
            console.log("Error at: isonLoan" + err)
        }
    }

    async checkRentalIncomeOfTokens(
        tokenIds,
        tokenTypes,
        alert
    ) {
        try {
            const weiAccrued = await this.contract.LoanBook.methods.checkRentalIncome(
                tokenIds,
                tokenTypes
            ).call()

            if (alert == true) setAlert('Rental Income (Wei) = ' + weiAccrued, 'success')
            return weiAccrued

        } catch (err) {
            if (alert == true) setAlert('checkRentalIncomeOfTokens error', 'warning')
            console.log("Error at: checkRentalIncomeOfTokens" + err)
        }
    }

    async checkRentalIncomeOfTypes(tokenTypes, alert = false) {
        try {
            const weiAccrued = await this.contract.LoanBook.methods.checkRentalIncomeOfTypes(
                tokenTypes
            ).call()
            if (alert == true) setAlert('Accrued rentalIncome (Wei): ' + weiAccrued, 'success')

            return weiAccrued
        } catch (err) {
            if (alert == true) setAlert('checkRentalIncomeOfTypes error', 'warning')
            console.log("Error at: checkRentalIncomeOfTypes" + err)
        }
    }

    async checkRentalIncomeOfAll(alert = false) {
        try {
            const weiAccrued = await this.contract.LoanBook.methods.checkRentalIncomeOfAll().call()
            if (alert == true) setAlert('Accrued rentalIncome (Wei): ' + weiAccrued, 'success')

            return weiAccrued
        } catch (err) {
            if (alert == true) setAlert('checkRentalIncomeOfAll error', 'warning')
            console.log("Error at: checkRentalIncomeOfAll" + err)
        }
    }

    async collectRentalIncomeOfTokens(
        tokenIds,
        tokenTypes,
        alert
    ) {
        console.log('In collectRentalIncomeOfTokens')
        console.log(tokenIds)
        console.log(tokenTypes)
        try {
            await this.contract.LoanBook.methods.collectRentalIncome(
                tokenIds,
                tokenTypes
            ).send({}, function (err, txHash) {
                //addAwaiter(txHash, "collectRentalIncomeOfAll")
                if (alert == true && err) setAlert(err, 'warning')
                else 
                {
                    if (alert == true) setAlert('Collected rental income (Wei)', 'success')
                    return txHash
                }
            })
        } catch (err) {
            if (alert == true) setAlert('collectRentalIncomeOfTokens error', 'warning')
            console.log("Error at: collectRentalIncomeOfTokens" + err)
        }
    }

    async collectRentalIncomeOfTypes(tokenTypes, alert = false) {
        try {
            await this.contract.LoanBook.methods.collectRentalIncomeOfTypes(
                tokenTypes
            ).send({}, function (err, txHash) {
                //addAwaiter(txHash, "collectRentalIncomeOfAll")
                if (alert == true && err) setAlert(err, 'warning')
                else 
                {
                    if (alert == true) setAlert('Collected rental income (Wei)', 'success')
                    return txHash
                }
            })
        } catch (err) {
            if (alert == true) setAlert('collectRentalIncomeOfTypes error', 'warning')
            console.log("Error at: collectRentalIncomeOfTypes" + err)
        }
    }

    async collectRentalIncomeOfAll(alert = false) {
        try {
            await this.contract.LoanBook.methods.collectRentalIncomeOfAll().send({}, function (err, txHash) {
                //addAwaiter(txHash, "collectRentalIncomeOfAll")
                if (alert == true && err) setAlert(err, 'warning')
                else 
                {
                    if (alert == true) setAlert('Collected rental income (Wei)', 'success')
                    return txHash
                }
            })
        } catch (err) {
            if (alert == true) setAlert('collectRentalIncomeOfAll error', 'warning')
            console.log("Error at: collectRentalIncomeOfAll" + err)
        }
    }

}
