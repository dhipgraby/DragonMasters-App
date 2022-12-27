<script>
	export let contract;

	let eggId_start;
	let eggId_check;
	let eggId_details;
	let eggId_hatch;
	let amountToMint;

</script>

<div class="mb-4">
	<h1>EggToken</h1>
</div>

<div class="mb-3">
	<button class="btn btn-info t-sm text-light bold text-sa" on:click={() => contract.currentSupply()}
		>Current Supply</button
	>
	<button class="btn btn-warning t-sm" on:click={() => contract.totalSupply()}>Total Supply</button>
</div>

<div class="row">
	<!-- MINTING -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Mint Eggs</h2>
			<p>Mint Gen 0 eggs. Mint one or many</p>
			<div class="mb-3">
				<input
					type="number"
					bind:value={amountToMint}
					class="form-control"
					placeholder="Egg Amounts"
				/>
			</div>
			<button class="btn btn-dark" on:click={() => contract.mintGen0Egg(amountToMint)}>MINT</button>
		</div>
	</div>
	<!-- GET EGG -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Get Egg</h2>
			<p>Get Egg details by Id</p>
			<div class="mb-3">
				<input type="text" bind:value={eggId_details} class="form-control" placeholder="Egg Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getEgg(eggId_details, true)}
				>Get Details</button
			>
		</div>
	</div>
	
	<!-- INCUBATION -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid" align="left">
			<table class="table table-striped">
				<tr>
					<h2>Start Incubation</h2>
					<div class="mb-3">
						<input type="text" bind:value={eggId_start} class="form-control" placeholder="Egg Id" />
					</div>
					<button class="btn btn-dark" on:click={() => contract.startIncubation(eggId_start)}
						>Start</button
					>
				</tr>
				<tr>
					<h2>Check Incubation time</h2>
					<div class="mb-3">
						<input type="text" bind:value={eggId_check} class="form-control" placeholder="Egg Id" />
					</div>
					<button class="btn btn-dark" on:click={() => contract.checkIncubation(eggId_check)}
						>Check</button
					>
				</tr>
				<tr>
					<h2>Hatch Egg</h2>
					<div class="mb-3">
						<input type="text" bind:value={eggId_hatch} class="form-control" placeholder="Egg Id" />
					</div>
					<button class="btn btn-dark" on:click={() => contract.hatch(eggId_hatch)}>HATCH!</button>
				</tr>
			</table>
		</div>
	</div>
</div>

<style>

	.btn-warning {
		font-weight: 600;
	}
</style>
