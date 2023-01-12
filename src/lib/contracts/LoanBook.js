import { setAlert,addAwaiter  } from "$lib/storage/alerts";
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
        const offers = []
        try {
            const ids = await this.contract.LoanBook.methods.getOnLoan(startIndex, endIndex, tokenType).call()
            const tokenIds = ids.tokenIds
            for (let i = 0; i < tokenIds.length; i++) {
                let currentOffer = await this.getLoan(ids.tokenIds[i], tokenType)
                offers.push(currentOffer)
            }
            if (alert == true) setAlert('Total Loans ' + ids.totalOnLoan + '.<p class="bold m-0">Token Ids: ' + ids.tokenIds + '</p>', 'success')
            
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
            const onLoan = await this.contract.LoanBook.methods.isOnLoan(tokenId, tokenType).call()
            if (alert == true) setAlert('Is on-loan: ' + onLoan, 'success')

            return onLoan
        } catch (err) {
            if (alert == true) setAlert('isOnLoan error', 'warning')
            console.log("Error at: isOnLoan" + err)
        }
    }

    async isLender(candidate, tokenId, tokenType, alert = false) {
        try {
            const is_lender = await this.contract.LoanBook.methods.isLender(
                candidate,
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('Is Lender: ' + is_lender, is_lender ? 'success' : 'warning')

            return is_lender
        } catch (err) {
            if (alert == true) setAlert('isLender error', 'warning')
            console.log("Error at: isLender" + err)
        }
    }

    async isBorrower(candidate, tokenId, tokenType, alert = false) {
        try {
            const is_borrower = await this.contract.LoanBook.methods.isBorrower(
                candidate,
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('Is Borrower: ' + is_borrower, is_borrower ? 'success' : 'warning')

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


    async borrowerOf(tokenId, tokenType, alert = false) {
        try {
            const borrower = await this.contract.LoanBook.methods.borrowerOf(
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('Borrower of token is: ' + borrower, 'success')

            return borrower
        } catch (err) {
            if (alert == true) setAlert('borrowerOf error', 'warning')
            console.log("Error at: borrowerOf" + err)
        }
    }


    async lenderOf(tokenId, tokenType, alert = false) {
        try {
            const lender = await this.contract.LoanBook.methods.lenderOf(
                tokenId,
                tokenType
            ).call()
            if (alert == true) setAlert('Lender of token is: ' + lender, 'success')

            return lender
        } catch (err) {
            if (alert == true) setAlert('lenderOf error', 'warning')
            console.log("Error at: lenderOf" + err)
        }
    }


    async getNumOnLoan(tokenType, alert = false) {
        try {
            const onLoan = await this.contract.LoanBook.methods.getNumOnLoan(tokenType).call()
            if (alert == true) setAlert('Total tokens on-loan (of token type): ' + onLoan, 'success')

            return onLoan
        } catch (err) {
            if (alert == true) setAlert('getNumOnLoan error', 'warning')
            console.log("Error at: getNumOnLoan" + err)
        }
    }


    async borrowerBalance(borrower, tokenType, alert = false) {
        try {
            const balance = await this.contract.LoanBook.methods.borrowerBalance(borrower, tokenType).call()
            if (alert == true) setAlert("Borrower's balance (of token type): " + balance, 'success')

            return balance
        } catch (err) {
            if (alert == true) setAlert('borrowerBalance error', 'warning')
            console.log("Error at: borrowerBalance" + err)
        }
    }


    async lenderBalance(lender, tokenType, alert = false) {
        try {
            const balance = await this.contract.LoanBook.methods.lenderBalance(lender, tokenType).call()
            if (alert == true) setAlert("Lender's balance (of token type): " + balance, 'success')

            return balance
        } catch (err) {
            if (alert == true) setAlert('lenderBalance error', 'warning')
            console.log("Error at: lenderBalance" + err)
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
            if (alert == true) setAlert('Accrued income for tokens (Wei) = ' + weiAccrued, 'success')

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
            if (alert == true) setAlert('Accrued income for token type (Wei): ' + weiAccrued, 'success')

            return weiAccrued
        } catch (err) {
            if (alert == true) setAlert('checkRentalIncomeOfTypes error', 'warning')
            console.log("Error at: checkRentalIncomeOfTypes" + err)
        }
    }

    async checkRentalIncomeOfAll(alert = false) {
        try {
            const weiAccrued = await this.contract.LoanBook.methods.checkRentalIncomeOfAll().call()
            if (alert == true) setAlert('Total accrued income on all tokens (Wei): ' + weiAccrued, 'success')

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
        try {
            await this.contract.LoanBook.methods.collectRentalIncome(
                tokenIds,
                tokenTypes
            ).send({}, function (err, txHash) {
                addAwaiter(txHash, "Collecting income of tokens, ids: " + JSON.stringify(tokenIds))
                if (alert == true && err) setAlert(err, 'warning')
                else {
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
                addAwaiter(txHash, "Collecting income of token types: "+ JSON.stringify(tokenTypes))
                if (alert == true && err) setAlert(err, 'warning')
                else {
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
                addAwaiter(txHash, "Collecting all accrued income")
                if (alert == true && err) setAlert(err, 'warning')
                else {
                    if (alert == true) setAlert('Collected rental income (Wei)', 'success')
                    return txHash
                }
            })
        } catch (err) {
            if (alert == true) setAlert('collectRentalIncomeOfAll error', 'warning')
            console.log("Error at: collectRentalIncomeOfAll" + err)
        }
    }

    async ethTotalDeposited(alert = false) {
        try {
            const weiAmount = await this.contract.LoanBook.methods.ethTotalDeposited().call()
            if (alert == true) setAlert('Total rental deposits (Wei): ' + weiAmount, 'success')
            
            return weiAmount
        } catch (err) {
            if (alert == true) setAlert('ethTotalDeposited error', 'warning')
            console.log("Error at: ethTotalDeposited" + err)
        }
    }

    async cEthTotalHeld(alert = false) {
        try {
            const cEthAmount = await this.contract.LoanBook.methods.cEthTotalHeld().call()
            if (alert == true) setAlert('Total cEth (in Compound): ' + cEthAmount, 'success')
            
            return cEthAmount
        } catch (err) {
            if (alert == true) setAlert('cEthTotalHeld error', 'warning')
            console.log("Error at: cEthTotalHeld" + err)
        }
    }

    async ethDeposited(tokenId, tokenType, alert = false) {
        try {
            const weiAmount = await this.contract.LoanBook.methods.ethDeposited(tokenId, tokenType).call()
            if (alert == true) setAlert('Rental deposit (Wei): ' + weiAmount, 'success')
            
            return weiAmount
        } catch (err) {
            if (alert == true) setAlert('ethDeposited error', 'warning')
            console.log("Error at: ethDeposited" + err)
        }
    }

    async cEthHeld(tokenId, tokenType, alert = false) {
        try {
            const cEthAmount = await this.contract.LoanBook.methods.cEthHeld(tokenId, tokenType).call()
            if (alert == true) setAlert("Token's current cEth (in Compound): " + cEthAmount, 'success')
            
            return cEthAmount
        } catch (err) {
            if (alert == true) setAlert('cEthHeld error', 'warning')
            console.log("Error at: cEthHeld" + err)
        }
    }
}