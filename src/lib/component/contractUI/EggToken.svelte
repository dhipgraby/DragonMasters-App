<script>
	export let contract;
	import Pagination from '$lib/component/pagination/UIpagination.svelte';

	let ownerAddress;
	let amountToMint;
	let startIndex = 0;
	let endIndex = 19;
	let singleEggId;
	let eggIds = '';

	
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

	async function mintGen0EggsTo() {
		contract.mintGen0EggsTo(ownerAddress, amountToMint, true);
	}

	async function getAllEggIds() {
		contract.getAllEggIds(startIndex, endIndex, true);
	}

	async function getEggIds() {
		contract.getEggIds(ownerAddress, startIndex, endIndex, true);
	}

	async function getEgg() {
		contract.getEgg(singleEggId, true);
	}

	async function startIncubation() {
		contract.startIncubation(eggIds, true);
	}

	async function checkIncubation() {
		contract.checkIncubation(singleEggId, true);
	}

	async function hatch() {
		contract.hatch(eggIds, true);
	}

</script>

<div class="mb-4">
	<h1>EggToken</h1>
</div>

<div class="mb-3">
	<button class="btn btn-warning t-sm text-light bold text-sa"
		on:click={() => contract.totalSupply()}>Total Supply</button>
	<button class="btn btn-warning t-sm text-light bold text-sa"
		on:click={() => contract.getAmountGen0EggsMinted()}>Gen-0 Minted</button>
	<button class="btn btn-info t-sm text-light bold text-sa"
		on:click={() => contract.currentSupply()}>Current Supply</button>
	<button class="btn btn-info t-sm text-light bold text-sa"
		on:click={() => contract.getAmountEggsMinted()}>Total Minted</button>
	<button class="bbtn btn-warning t-sm"
		on:click={() => contract.getRace()}>'Race' contract</button>
</div>

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">

		<!-- MINT EGGS TO -->
		<div class="grid">
			<h2>Mint Eggs</h2>
			<p>(medium size - hardcoded)</p>
			<p class="bold">To owner</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={ownerAddress}
					class="form-control mb-3"
					placeholder="address"
				/>
			</div>
			<p class="bold">Amount</p>
			<div class="mb-3">
				<input
					type="number"
					bind:value={amountToMint}
					class="form-control"
					placeholder="1"
				/>
			</div>
			<button class="btn btn-dark" on:click={() => mintGen0EggsTo()}>MINT</button>
		</div>

	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">

		<!-- GET ALL EGG IDS OF -->
		<div class="grid" align="left">
			<h2>Get All Egg Ids</h2>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getAllEggIds()}>GET</button>
		</div>

		<!-- GET EGG IDS OF -->
		<div class="grid" align="left">
			<h2>Get Egg Ids</h2>
			<p class="bold">Of owner</p>
			<div class="mb-3">
				<input
					type="text"
					bind:value={ownerAddress}
					class="form-control mb-3"
					placeholder="address"
				/>
			</div>
			<p class="bold">Paging: start & end indexes</p>
			<div class="mb-3">
				<Pagination {startIndex} {endIndex} {changeIndex} />
			</div>
			<button class="btn btn-dark" on:click={() => getEggIds()}>GET</button>
		</div>

		<!-- GET EGG -->
		<div class="grid">
			<h2>Get Egg</h2>
			<p>Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={singleEggId} class="form-control" placeholder="Egg Id" />
			</div>
			<button class="btn btn-dark" on:click={() => getEgg()}
				>GET</button
			>
		</div>
	</div>
	
	<!-- INCUBATION -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<h2>Start Incubation</h2>
			<div class="mb-3">
				<input type="text" bind:value={eggIds} class="form-control" placeholder="0, 1, ..." />
			</div>
			<button class="btn btn-dark" on:click={() => startIncubation()}>START</button>
		</div>

		<div class="grid" align="left">
			<h2>Check Incubation time</h2>
			<div class="mb-3">
				<input type="text" bind:value={singleEggId} class="form-control" placeholder="0" />
			</div>
			<button class="btn btn-dark" on:click={() => checkIncubation()}>CHECK</button>
		</div>

		<div class="grid" align="left">
			<h2>Hatch Egg</h2>
			<div class="mb-3">
				<input type="text" bind:value={eggIds} class="form-control" placeholder="0, 1, ..." />
			</div>
			<button class="btn btn-dark" on:click={() => hatch()}>HATCH</button>
		</div>
	</div>
</div>

<style>

	.btn-warning {
		font-weight: 600;
	}
</style>
