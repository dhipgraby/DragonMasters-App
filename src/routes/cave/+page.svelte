<script>
	//COMPONENTS
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';
	//STORAGE
	import { userDragons } from '$lib/storage/dragon';
	import { userEggs } from '$lib/storage/eggs';
	//CONTRACTS
	import { onMount } from 'svelte';
	import { LoadInterface, contracts } from '$lib/interfaces/ICave';
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import { perpage } from '$lib/storage/pagination';

	let show = 1;
	let fromId = 0;

	$: contract = $contracts;
	$: eggs = $userEggs;
	$: dragons = $userDragons;

	onMount(async () => {				
		perpage.useLocalStorage();
		let toId = $perpage;
		await LoadInterface(fromId, toId);
		console.log(eggs);
	});
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<div class="btn-group" role="group">
	<button type="button" on:click={() => (show = 1)} class="btn darkBtn"
		><i class="fas fa-egg" /> EGGS
	</button>
	<button type="button" on:click={() => (show = 2)} class="btn darkBtn"
		><i class="fas fa-dragon" /> DRAGONS
	</button>
</div>

<MainContainer>
	{#if show == 1}
		<EggGrid {eggs} {contract} loadPage={LoadInterface} />
	{/if}

	{#if show == 2}
		<DragonGrid {dragons} contract={contract['market']} loadPage={LoadInterface} />
	{/if}
</MainContainer>

<style>
	.btn-group {		
		max-width:520px;
		margin: auto;
		margin-top: 50px;
	}
</style>
