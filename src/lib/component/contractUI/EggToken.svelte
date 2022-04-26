<script>
	
    export let contract

	let eggId_start;
	let eggId_check;
	let eggId_details;
	let eggId_hatch;
	let amountToMint;
</script>

<h1>EggToken</h1>

<br />
<div class="grid" align="left">

	<button class="btn btn-warning t-sm" on:click={() => contract.currentSupply()}>Current Supply</button>
	<button class="btn btn-warning t-sm" on:click={() => contract.totalSupply()}>Total Supply</button>


	<br />
	<table class="table table-striped">
		<tr>
			<h2>Mint Gen 0 egg</h2>
			<button class="btn btn-dark" on:click={() => contract.mintGen0Egg()}>MINT</button>
		</tr>
		<tr>
			<h2>Batch Miting</h2>
			<div class="mb-3">
				<input type="number" bind:value={amountToMint} class="form-control" placeholder="Egg Amounts" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.mintBatchEggsTo(amountToMint)}
				>Batch Mint!</button
			>
		</tr>
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
			<h2>Get Egg details</h2>
			<div class="mb-3">
				<input type="text" bind:value={eggId_details} class="form-control" placeholder="Egg Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getEgg(eggId_details)}
				>Get Details</button
			>
		</tr>

		<tr>
			<h2>Hatch</h2>
			<div class="mb-3">
				<input type="text" bind:value={eggId_hatch} class="form-control" placeholder="Egg Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.hatch(eggId_hatch)}>HATCH!</button>
		</tr>
	</table>
</div>

<style>
	.btn-warning  {
		font-weight: 600;
	}
</style>