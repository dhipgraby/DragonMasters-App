<script>
	import BreedBox from '$lib/component/breed/BreedBox.svelte';
	import { onMount } from 'svelte';

	let SubSpecies = null;

	onMount(() => {
		SubSpecies = null;
	});

	function selectSubSpecie(number) {
		SubSpecies = number;
	}
</script>

<svelte:head>
	<title>Breed Dragons</title>
</svelte:head>

<div class="container mt-5">
	<div class="inner">
		<div class="mb-5">
			<h1 class="egg"><i class="fas fa-egg" /></h1>
			<h1>Breeding</h1>
			<p>You can breed only Adults dragons with same Species</p>
		</div>
	</div>

	{#if SubSpecies == null}
		<!-- LITHOSPHERE -->
		<div class="row">
			<div class="col p-1">
				<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(0)}>
					<h1 class="egg earth"><i class="fas fa-egg" /></h1>
					<h3>Earth</h3>
				</div>
			</div>
			<div class="col p-1">
				<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(1)}>
					<h1 class="egg fire"><i class="fas fa-egg" /></h1>
					<h3>Fire</h3>
				</div>
			</div>

			<!-- HIDROSPHERE -->

			<div class="col p-1">
				<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(2)}>
					<h1 class="egg air"><i class="fas fa-egg" /></h1>
					<h3>Air</h3>
				</div>
			</div>
			<div class="col p-1">
				<div class="eggContainer pointer" id="mum" on:click={() => selectSubSpecie(3)}>
					<h1 class="egg water"><i class="fas fa-egg" /></h1>
					<h3>Water</h3>
				</div>
			</div>
		</div>
	{:else}
		<div class="ta-c mb-3">
			<button class="btn btn-dark" on:click={() => SubSpecies = 0 }> Change Element </button>
		</div>
		<BreedBox {SubSpecies} />
	{/if}
</div>

<style>
	.row {
		justify-content: center;
	}

	.inner {
		text-align: center;
	}

	.egg {
		color: #ff6d6d;
	}

	.col {
		margin: 10px 20px;
		max-width: 300px;
		align-self: center;
	}

	.eggContainer:hover {
		box-shadow: 0px 10px 20px -8px;
	}
</style>
