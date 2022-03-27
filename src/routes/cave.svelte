<script>
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	import { EggContract, userEggs } from '$lib/contracts/EggToken';
	import { initEventListener } from '$lib/contracts/events';
	import { DragonContract, userDragons } from '$lib/contracts/DragonToken';
	import { onMount } from 'svelte';

	let contract = [];
	let eggs = [];
	let dragons = [];

	let show = 1;

	onMount(async () => {
		contract['egg'] = await new EggContract();
		contract['dragon'] = await new DragonContract();

		let contractEvents = await contract.egg.contract.EggToken.events;
		let updater = () => {
			contract['egg'].getUserEggs();
		};
		await initEventListener(contractEvents, updater);

		if (eggs.length > 0) return;
		await contract['egg'].getUserEggs();
		if (dragons.length > 0) return;
		await contract['dragon'].getUserDragons();
	});

	const subscribeEggs = userEggs.subscribe((value) => {
		eggs = value;
	});

	const subscribeDragons = userDragons.subscribe((value) => {
		dragons = value;
	});
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
	<link href="/css/egg.css" rel="stylesheet" />
</svelte:head>

<section>
	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light">EGG CONTRACT</button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light">DRAGON CONTRACT</button>
	</div>

	{#if show == 1}
		<EggGrid {eggs} contract={contract['egg']} />
	{/if}

	{#if show == 2}
		<DragonGrid {dragons} contract={contract['dragon']} />
	{/if}
</section>

<style>
	section {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.btn-group .btn {
		margin: 8px;
		font-weight: 600;
		letter-spacing: 0.8px;
		font-size: 14px;
	}

	.btn-group {
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
