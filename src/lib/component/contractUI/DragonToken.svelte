<script>
	import Pagination from '$lib/component/pagination/UIpagination.svelte';
	import { setAlert } from '$lib/storage/alerts';


	export let contract;

	let getDragonId;
	let relatedA;
	let relatedB;

	let OwnerAddress
	let startIndex = 0
	let endIndex = 9
	let singleId

	let tokenIdsA = ""
	let tokenIdsB = ""


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

	async function getDragonIds() {
		contract.getDragonIds(OwnerAddress, 0, 20, true);
	}

	async function getDragon() {
		contract.getDragon(singleId, true);
	}


	async function checkEnergy() {
		contract.checkEnergy(singleId, true);
	}


	async function checkMaturity() {
		contract.checkMaturity(singleId, true);
	}

	async function getRelationship() {
		contract.getRelationship(relatedA, relatedB, true);
	}

	async function breed() {
		if (tokenIdsA.length == 0 && tokenIdsB.length == 0)
			setAlert('Specify at least one pair of dragons for breeding', 'warning');
			
		let mateA_Ids = [];
		if (tokenIdsA.length > 0) {
			mateA_Ids = tokenIdsA.split(',').map(Number);
		}
		let mateB_Ids = [];
		if (tokenIdsB.length > 0) {
			mateB_Ids = tokenIdsB.split(',').map(Number);
		}
		if (tokenIdsA.length != tokenIdsB.length)
			setAlert('Specify breeding pairs, ie. equal number of mate As & Bs', 'warning');
		else {
			contract.breed(tokenIdsA, tokenIdsB, true);
		}	
	}




</script>

<h1>DragonToken</h1>

<button class="btn btn-info text-light bold mb-3 mt-3" on:click={() => contract.totalSupply()}
	>Total Supply</button
>

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">

		<div class="grid" align="left">
			<h2>Get Dragon Ids</h2>
			<p class="bold">of Owner</p>		
			<div class="mb-3">
				<input type="text" bind:value={OwnerAddress} class="form-control mb-3" placeholder="address"/>
			</div>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getDragonIds()}>GET</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Dragon</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0"/>
			</div>
			<button class="btn btn-dark" on:click={() => getDragon()}>GET</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">

		<div class="grid" align="left">
			<h2>Check Energy</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0"/>
			</div>
			<button class="btn btn-dark" on:click={() => checkEnergy()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Check Maturity</h2>
			<p class="bold">Token Id</p>		
			<div class="mb-3">
				<input type="text" bind:value={singleId} class="form-control" placeholder="0"/>
			</div>
			<button class="btn btn-dark" on:click={() => checkMaturity()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Get Relationship (A to B)</h2>
			<p class="bold">Token Id A</p>		
			<div class="mb-3">
				<input type="text" bind:value={relatedA} class="form-control mb-3" placeholder="0"/>
				<p class="bold">Token Id B</p>		
				<input type="text" bind:value={relatedB} class="form-control" placeholder="1" />
			</div>
			<button class="btn btn-dark" on:click={() => getRelationship()}>GET</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Breed Dragons</h2>
			<p class="bold">Mate As: Token Ids</p>		
			<div class="mb-3">
				<input type="text" bind:value={tokenIdsA} class="form-control mb-3" placeholder="0, 1, ..."/>
				<p class="bold">Mate Bs: Token Ids</p>		
				<input type="text" bind:value={tokenIdsB} class="form-control" placeholder="3, 5, ..." />
			</div>
			<button class="btn btn-dark" on:click={() => breed()}>MATE</button>
		</div>
	</div>
</div>
