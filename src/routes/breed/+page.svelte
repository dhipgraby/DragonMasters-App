<script>
	import { onMount } from 'svelte';
	import BreedBox from '$lib/component/breed/BreedBox.svelte';
	import ChooseElement from '$lib/component/breed/ChooseElement.svelte';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { initEventListener } from '$lib/contracts/events';
	import { getNewEgg } from '$lib/data/egg';

	let SubSpecies = null;
	let contract;
	let newEggs;
	let breedEvent = false;

	onMount(async () => {
		contract = await new DragonContract();
		let contractEvents = await contract.contract.DragonToken.events;
		const updater = (event) => {
			newEggs = [];
			const returnValues = event.returnValues;
			setNewEggs(returnValues, event);
			breedEvent = true;
		};
		await initEventListener(contractEvents, updater, 'DragonToken');
		// userDragons.useLocalStorage()
		await contract.getUserDragons(0, 10);
	});

	function selectSubSpecie(number) {
		SubSpecies = number;
	}

	function setNewEggs(returnValues) {
		const eggIds = returnValues.eggIds;
		const provenance = returnValues.provenance;
		if (eggIds.length > 0) {
			if (eggIds[0] !== undefined) newEggs.push(getNewEgg(eggIds[0], provenance[0]));
			if (eggIds[1] !== undefined) newEggs.push(getNewEgg(eggIds[1], provenance[1]));
		}
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
		<ChooseElement {selectSubSpecie} />
	{:else}
		<div class="ta-c mb-3">
			<button class="btn btn-dark" on:click={() => (SubSpecies = null)}> Change Element </button>
		</div>
		<BreedBox {SubSpecies} {breedEvent} {newEggs} {contract} />
	{/if}
</div>

<style>
	.btn {
		width: fit-content;
	}

	.inner {
		text-align: center;
	}

	.egg {
		color: #ff6d6d;
	}

	.fa-egg {
		text-shadow: 0px 2px 8px #747474;
	}
</style>
