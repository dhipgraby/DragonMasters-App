<script>
	import { TokenType } from '$lib/contracts/LoanBook';
	import Pagination from '$lib/component/pagination/UIpagination.svelte';
	import { setAlert } from '$lib/storage/alerts';

	export let contract;

	let _tokenType = TokenType.Dragon,
		startIndex = 0,
		endIndex = 9,
		borrowerIndex = 0,
		borrowerEndIndex = 9,
		lenderIndex = 0,
		lenderEndIndex = 9,
		lender = '',
		borrower = '',
		lender_address = '',
		borrower_address = '',
		singleId,
		onLoanId,
		lender_tokenId,
		borrower_tokenId,
		check_egg_tokenIds = '',
		check_dragon_tokenIds = '';


	let checkDragons = true;
	let checkEggs = false;

	async function getOnLoan() {
		contract.getOnLoan(startIndex, endIndex, _tokenType, true);
	}

	async function getLoan() {
		contract.getLoan(singleId, _tokenType, true);
	}

	async function isOnLoan() {
		contract.isOnLoan(onLoanId, _tokenType, true);
	}

	async function borrowerOf() {
		contract.borrowerOf(lender_tokenId, _tokenType, true);
	}

	async function lenderOf() {
		contract.lenderOf(lender_tokenId, _tokenType, true);
	}

	async function isBorrower() {
		contract.isBorrower(borrower_address, borrower_tokenId, _tokenType, true);
	}

	async function isLender() {
		contract.isLender(lender_address, lender_tokenId, _tokenType, true);
	}

	async function getBorrowedBy() {
		contract.getBorrowedBy(borrower, borrowerIndex, borrowerEndIndex, _tokenType, true);
	}

	async function getLoanedBy() {
		contract.getLoanedBy(lender, lenderIndex, lenderEndIndex, _tokenType, true);
	}

	async function getNumOnLoan() {
		contract.getNumOnLoan(_tokenType, true);
	}

	async function borrowerBalance() {
		contract.borrowerBalance(borrower, _tokenType, true);
	}

	async function lenderBalance() {
		contract.lenderBalance(lender, _tokenType, true);
	}

	async function checkRentalIncomeOfTokens() {
		if (check_egg_tokenIds.length == 0 && check_dragon_tokenIds.length == 0)
			setAlert('Specify at least one token id', 'warning');
			
		let check_egg_Ids = [];
		let check_egg_tokenTypes = [];
		if (check_egg_tokenIds.length > 0) {
			check_egg_Ids = check_egg_tokenIds.split(',').map(Number);
			check_egg_tokenTypes = new Array(check_egg_Ids.length).fill(TokenType.Egg);
		}
		let check_dragon_Ids = [];
		let check_dragon_tokenTypes = [];
		if (check_dragon_tokenIds.length > 0) {
			check_dragon_Ids = check_dragon_tokenIds.split(',').map(Number);
			check_dragon_tokenTypes = new Array(check_dragon_Ids.length).fill(TokenType.Dragon);
		}
		const check_ids = check_egg_Ids.concat(check_dragon_Ids);
		const check_tokenTypes = check_egg_tokenTypes.concat(check_dragon_tokenTypes);

		contract.checkRentalIncomeOfTokens(check_ids, check_tokenTypes, true);
	}

	async function checkRentalIncomeOfTypes() {
		if (checkDragons == false && checkEggs == false)
			setAlert('Select at least one token type', 'warning');
		const check_tokenTypes = [];
		if (checkDragons == true) check_tokenTypes.push(TokenType.Dragon);
		if (checkEggs == true) check_tokenTypes.push(TokenType.Egg);

		contract.checkRentalIncomeOfTypes(check_tokenTypes, true);
	}

	async function checkRentalIncomeOfAll() {
		contract.checkRentalIncomeOfAll(true);
	}

	async function collectRentalIncomeOfTokens() {
		if (check_egg_tokenIds.length == 0 && check_dragon_tokenIds.length == 0)
			setAlert('Specify at least one token id', 'warning');
			
		let check_egg_Ids = [];
		let check_egg_tokenTypes = [];
		if (check_egg_tokenIds.length > 0) {
			check_egg_Ids = check_egg_tokenIds.split(',').map(Number);
			check_egg_tokenTypes = new Array(check_egg_Ids.length).fill(TokenType.Egg);
		}
		let check_dragon_Ids = [];
		let check_dragon_tokenTypes = [];
		if (check_dragon_tokenIds.length > 0) {
			check_dragon_Ids = check_dragon_tokenIds.split(',').map(Number);
			check_dragon_tokenTypes = new Array(check_dragon_Ids.length).fill(TokenType.Dragon);
		}
		const check_ids = check_egg_Ids.concat(check_dragon_Ids);
		const check_tokenTypes = check_egg_tokenTypes.concat(check_dragon_tokenTypes);

		contract.collectRentalIncomeOfTokens(check_ids, check_tokenTypes, true);
	}

	async function collectRentalIncomeOfTypes() {
		if (checkDragons == false && checkEggs == false)
			setAlert('Select at least one token type', 'warning');
		const check_tokenTypes = [];
		if (checkDragons == true) check_tokenTypes.push(TokenType.Dragon);
		if (checkEggs == true) check_tokenTypes.push(TokenType.Egg);
		console.log(check_tokenTypes);
		contract.collectRentalIncomeOfTypes(check_tokenTypes, true);
	}

	async function collectRentalIncomeOfAll() {
		contract.collectRentalIncomeOfAll(true);
	}

    async function ethTotalDeposited() {
		contract.ethTotalDeposited(true);
    }

    async function cEthTotalHeld() {
		contract.cEthTotalHeld(true);
    }

    async function ethDeposited() {
		contract.ethDeposited(singleId, _tokenType, true);

    }

    async function cEthHeld() {
		contract.cEthHeld(singleId, _tokenType, true);
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
			<h2>Total on-loan (of token type)</h2>
			<button class="btn btn-dark" on:click={() => getNumOnLoan()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>All tokens on loan (of type)</h2>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getOnLoan()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Is token on loan?</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={onLoanId} placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => isOnLoan()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Loan details</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={singleId} placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => getLoan()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Total loaned-out by</h2>
			<p class="bold">Address</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={lender} placeholder="Address" />
			</div>
			<button class="btn btn-dark" on:click={() => lenderBalance()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Tokens loaned-out by</h2>
			<p class="bold">Address</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={lender} placeholder="Address" />
			</div>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getLoanedBy()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Total borrowed by</h2>
			<p class="bold">Address</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={borrower} placeholder="Address" />
			</div>
			<button class="btn btn-dark" on:click={() => borrowerBalance()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Tokens borrowed by</h2>
			<p class="bold">Address</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={borrower} placeholder="Address" />
			</div>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getBorrowedBy()}>GET</button>
		</div>


		<div class="grid" align="left">
			<h2>Rentee/lender (of token)</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={lender_tokenId}
				 placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => lenderOf()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Borrower (of token)</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={borrower_tokenId}
				 placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => borrowerOf()}>GET</button>
		</div>


		<div class="grid" align="left">
			<h2>Is rentee/lender of token?</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={lender_tokenId}
				 placeholder="0" />
			</div>
			<p class="bold">Candidate</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={lender_address} placeholder="Address" />
			</div>
			<button class="btn btn-dark" on:click={() => isLender()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Is borrower of token?</h2>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={borrower_tokenId}
				 placeholder="0" />
			</div>
			<p class="bold">Candidate</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={borrower_address} placeholder="Address" />
			</div>
			<button class="btn btn-dark" on:click={() => isBorrower()}>CHECK</button>
		</div>

	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">

		<div class="grid" align="left">
			<h2>Total Eth deposited</h2>
			<button class="btn btn-dark" on:click={() => ethTotalDeposited()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Total cEth held (for Eth)</h2>
			<button class="btn btn-dark" on:click={() => cEthTotalHeld()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Eth deposited (for token)</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={singleId} placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => ethDeposited()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>cEth held (for token's Eth)</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="number" class="form-control" bind:value={singleId} placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => cEthHeld()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Accumulated rental income</h2>
			<p class="bold">Eggs: List of Token Ids</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={check_egg_tokenIds}
					class="form-control"
					placeholder="0, 1, ..."
				/>
			</div>
			<p class="bold">Dragons: List of Token Ids</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={check_dragon_tokenIds}
					class="form-control"
					placeholder="0, 1, ..."
				/>
			</div>
			<button class="btn btn-dark" on:click={() => checkRentalIncomeOfTokens()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Accumulated rental income</h2>
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
			<button class="btn btn-dark" on:click={() => checkRentalIncomeOfTypes()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>All accumulated rental income</h2>
			<button class="btn btn-dark" on:click={() => checkRentalIncomeOfAll()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Collect rental Income</h2>
			<p class="bold">Eggs: List of Token Ids</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={check_egg_tokenIds}
					class="form-control"
					placeholder="0, 1, ..."
				/>
			</div>
			<p class="bold">Dragons: List of Token Ids</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={check_dragon_tokenIds}
					class="form-control"
					placeholder="0, 1, ..."
				/>
			</div>
			<button class="btn btn-dark" on:click={() => collectRentalIncomeOfTokens()}>COLLECT</button>
		</div>

		<div class="grid" align="left">
			<h2>Collect rental Income</h2>
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
			<button class="btn btn-dark" on:click={() => collectRentalIncomeOfTypes()}>COLLECT</button>
		</div>

		<div class="grid" align="left">
			<h2>Collect all rental Income</h2>
			<button class="btn btn-dark" on:click={() => collectRentalIncomeOfAll()}>COLLECT</button>
		</div>
	</div>
</div>

