<script>
	import { TokenType } from '$lib/contracts/LoanBook';
    import Pagination from '$lib/component/pagination/UIpagination.svelte';
	export let contract;

    let tokenType = TokenType.Dragon
    let startIndex = 1;
    let endIndex = 10;
    let borrowerIndex = 1;
    let borrowerEndIndex = 10;
    let lenderIndex = 1;
    let lenderEndIndex = 10;
    let lender = "";
    let borrower = "";
    let singleId; 
    let onLoanId;
    let returnId;

	async function getOnLoan() {
        console.log(startIndex +'-'+  endIndex)
		contract.getOnLoan(startIndex, endIndex, tokenType,true);
	}

	async function getLoan() {
		contract.getLoan(singleId, tokenType);
	}

	async function isOnLoan() {
		contract.isOnLoan(onLoanId, tokenType);
	}

	async function getBorrowedBy() {
		contract.getBorrowedBy(borrower, borrowerIndex, borrowerEndIndex, tokenType);
	}

	async function getLoanedBy() {
		contract.getLoanedBy(lender,lenderIndex, lenderEndIndex, tokenType);
	}

	async function getNumOnLoan() {
		contract.getNumOnLoan(tokenType);
	}

	async function returnLoan(to) {
		contract.returnLoan(to, returnId, tokenType);
	}
    
    function changeIndex(indexType,value){
        switch(indexType){
            case 'start' : 
            startIndex = value;
            break
            case 'end' : 
            endIndex = value;
            break
        }
    }    

</script>

<h1>
    <i class="fas fa-book" />
    LoanBook     
</h1>

<br />
<div class="grid" align="left">

	<table class="table table-striped">
		<tr>
			<h2>Get All Loans</h2>						               
            <Pagination {startIndex} {endIndex} {changeIndex} />
            <button class="btn btn-dark" on:click={() => getOnLoan()}>GET ALL</button>            
		</tr>
        <!-- <tr>
			<h2>Get All Loans</h2>
			<div class="mb-3">
				<input type="text" bind:value={''} class="form-control" placeholder="Dragon Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getDragon(getDragonId)}>GET</button>
		</tr> -->
	</table>
</div>
