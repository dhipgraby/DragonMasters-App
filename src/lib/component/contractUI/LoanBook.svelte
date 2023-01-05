<script>
	import { TokenType } from '$lib/contracts/LoanBook';
	import Pagination from '$lib/component/pagination/UIpagination.svelte';
	import { setAlert } from '$lib/storage/alerts';

	export let contract;

	let _tokenType = TokenType.Dragon,
		startIndex = 1,
		endIndex = 10,
		borrowerIndex = 1,
		borrowerEndIndex = 10,
		lenderIndex = 1,
		lenderEndIndex = 10,
		lender = '',
		borrower = '',
		candidate_address = '',
		singleId,
		onLoanId,
		returnId,
		candidate_tokenId,
		check_tokenIds;

	let checkDragons = true;
	let checkEggs = false;

	async function getOnLoan() {
		console.log(startIndex + '-' + endIndex);
		contract.getOnLoan(startIndex, endIndex, _tokenType, true);
	}

	async function getLoan() {
		contract.getLoan(singleId, _tokenType);
	}

	async function isOnLoan() {
		contract.isOnLoan(onLoanId, _tokenType);
	}

	async function isLender() {
		contract.isLender(candidate_address, candidate_tokenId, _tokenType, true);
	}

	async function getBorrowedBy() {
		contract.getBorrowedBy(borrower, borrowerIndex, borrowerEndIndex, _tokenType);
	}

	async function getLoanedBy() {
		contract.getLoanedBy(lender, lenderIndex, lenderEndIndex, _tokenType);
	}

	async function getNumOnLoan() {
		contract.getNumOnLoan(_tokenType);
	}

	async function returnLoan(to) {
		contract.returnLoan(to, returnId, _tokenType);
	}

	function changeIndex(indexType, value) {
		switch (indexType) {
			case 'start':
				startIndex = value;
				break;
			case 'end':
				endIndex = value;
				break;
		}
	}

	async function checkRentalIncome() {
		if (checkDragons == false && checkEggs == false)
			setAlert('Select at leat one token type', 'warning');
		const check_tokenTypes = [];
		if (checkDragons == true) check_tokenTypes.push(TokenType.Dragon);
		if (checkEggs == true) check_tokenTypes.push(TokenType.Egg);
		console.log(check_tokenIds);
		console.log(check_tokenTypes);
		return;
		contract.checkRentalIncome(check_tokenIds, check_tokenTypes, true);
	}
</script>

<h1 class="mb-4">
	<i class="fas fa-book" />
	LoanBook
</h1>
<p class="bold">Select token Type</p>
<select class="form-select mb-3 " bind:value={_tokenType}>
	<option value={TokenType.Dragon} selected>Dragon</option>
	<option value={TokenType.Egg}>Egg</option>
</select>

<br />

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Is Lender</h2>
			<p class="bold">Token id</p>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={candidate_tokenId} placeholder="tokenId" />
			</div>
			<p class="bold">Candidate</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={candidate_address} placeholder="Address" />
			</div>
			<button class="btn btn-dark" on:click={() => isLender()}>Check</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Loan</h2>			
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={singleId} placeholder="tokenId" />
			</div>
			<button class="btn btn-dark" on:click={() => getLoan()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Loan</h2>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={singleId} placeholder="tokenId" />
			</div>
			<button class="btn btn-dark" on:click={() => getLoan()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get All Loans</h2>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getOnLoan()}>GET ALL</button>
		</div>
	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Check rental Income</h2>
			<div class="mb-3">
				<input
					type="text"
					bind:value={check_tokenIds}
					class="form-control"
					placeholder="Token Ids"
				/>
			</div>
			<div class="mb-3">
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="checkbox"
						id="dragonCheckbox"
						bind:checked={checkDragons}
					/>
					<label class="form-check-label" for="dragonCheckbox"><b>Dragon</b></label>
				</div>
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="checkbox"
						id="eggCheckbox"
						bind:checked={checkEggs}
					/>
					<label class="form-check-label" for="eggCheckbox"><b>Egg</b></label>
				</div>
			</div>
			<button class="btn btn-dark" on:click={() => checkRentalIncome()}>Check</button>
		</div>
	</div>
</div>
