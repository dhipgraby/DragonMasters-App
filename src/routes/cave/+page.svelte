<script>
	//COMPONENTS
	import EggGrid from '$lib/component/egg/EggGrid.svelte';
	import DragonGrid from '$lib/component/dragon/DragonGrid.svelte';	
	//STORAGE
	import { userDragons } from '$lib/storage/dragon';	
	import { userEggs } from '$lib/storage/eggs';
	//CONTRACTS
	import { onMount } from 'svelte';
	import { LoadInterface, contracts, approvalRequired } from '$lib/interfaces/ICave';
import MainContainer from '$lib/component/containers/MainContainer.svelte';

	let singleApproval = false;
	let show = 2;
	let fromId = 0;
	let toId = 10;

	$: contract = $contracts;
	$: eggs = $userEggs;
	$: dragons = $userDragons;
	$: singleApproval = $approvalRequired;

	onMount(async () => {
		// userDragons.useLocalStorage()
		LoadInterface(fromId, toId);
		console.log(dragons)
	});
</script>

<svelte:head>
	<title>Cave - Dragon Masters</title>
</svelte:head>

<MainContainer>
<section>
	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light"
			><i class="fas fa-egg" /> EGGS
		</button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light"
			><i class="fas fa-dragon" /> DRAGONS
		</button>
	</div>
	{#if show == 1}
		<EggGrid {eggs} contract={contract['egg']} loadPage={LoadInterface} />
	{/if}

	{#if show == 2}
		<DragonGrid {dragons} contract={contract['market']} {singleApproval} />
	{/if}
</section>
</MainContainer>
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
	}

	.btn-group {
		margin-top: 20px;
		margin-bottom: 20px;
	}

</style>
