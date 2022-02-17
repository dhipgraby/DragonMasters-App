<script>
	import { EggContract } from '$lib/contracts/methods';
	import { onMount } from 'svelte';

	let contract;
	let eggId_start;
	let eggId_check;
	let eggId_details;

	onMount(async () => {
		contract = await new EggContract();
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>EggToken Contract Workflow</h1>

	<br />
	<div class="grid" align="left">
		<table class="table table-striped">
			<tr>
				<h2>Mint Gen 0 egg</h2>
				<button class="btn btn-dark" on:click={() => contract.mintGen0Egg()}>MINT</button>
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
		</table>
	</div>
</section>

<style>
	input {
		border-radius: 50px;
		border: solid 2px #919191;
		
	}

	input::-webkit-input-placeholder {
		padding-left: 10px;
	}

	.grid {
		background-color: white;
		border: solid 2px #919191;
		border-radius: 20px;
		padding: 30px;
		min-width: 600px;
		max-width: 600px;
	}

	table,
	tr {
		border: none !important;
	}

	tr {
		padding: 25px;
	}

	h2 {
		line-height: 60px;
		font-weight: 600;
		font-size: 25px;
	}

	.btn-dark {
		font-weight: 600;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		background-color: black;
		border-radius: 50px;
		padding: 10px 24px;
	}

	.btn-dark:hover {
		background-color: rgb(75, 75, 75);
	}

	section {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
