<script>
	import { TokenType } from '$lib/contracts/LoanBook';
    import Pagination from '$lib/component/pagination/UIpagination.svelte';
	export let contract;

    let _tokenType = TokenType.Dragon
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
		contract.getOnLoan(startIndex, endIndex, _tokenType,true);
	}

	async function getLoan() {
		contract.getLoan(singleId, _tokenType);
	}

	async function isOnLoan() {
		contract.isOnLoan(onLoanId, _tokenType);
	}

	async function getBorrowedBy() {
		contract.getBorrowedBy(borrower, borrowerIndex, borrowerEndIndex, _tokenType);
	}

	async function getLoanedBy() {
		contract.getLoanedBy(lender,lenderIndex, lenderEndIndex, _tokenType);
	}

	async function getNumOnLoan() {
		contract.getNumOnLoan(_tokenType);
	}

	async function returnLoan(to) {
		contract.returnLoan(to, returnId, _tokenType);
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

<h1 class="mb-4">
    <i class="fas fa-book" />
    LoanBook     
</h1>
<p class="bold">Select token Type</p>
<select class="form-select mb-3" bind:value={_tokenType}>
	<option value={TokenType.Dragon} selected>Dragon</option>
	<option value={TokenType.Egg}>Egg</option>
</select>

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
