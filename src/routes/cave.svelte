<script>
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	import { userDragons }  from "$lib/storage/dragon";
	import { userEggs }  from "$lib/storage/eggs";
	import { EggContract } from '$lib/contracts/EggToken';
	import { initEventListener } from '$lib/contracts/events';
	import { DragonContract } from '$lib/contracts/DragonToken';	
	import { onMount } from 'svelte';

	let contract = [];
	$: eggs = $userEggs;
	$: dragons = $userDragons;

	let show = 2;

	onMount(async () => {

		// userDragons.useLocalStorage()		

		contract['egg'] = await new EggContract();
		contract['dragon'] = await new DragonContract();

		let contractEvents = await contract.egg.contract.EggToken.events;
		let updater = () => {
			contract['egg'].getUserEggs();
		};
		await initEventListener(contractEvents, updater,'EggToken');

		if (eggs.length > 0) return;
		await contract['egg'].getUserEggs();
		if (dragons.length > 0) return;
		await contract['dragon'].getUserDragons();		
	});

</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<section>
	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light"><i class="fas fa-egg"></i> EGGS </button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light"><i class="fas fa-dragon" /> DRAGONS </button>
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
