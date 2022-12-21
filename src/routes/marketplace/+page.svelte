<script>
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import MarketGrid from '$lib/component/marketplace/MarketGrid.svelte';
	import { onMount } from 'svelte';
	import { LoadInterface, contracts } from '$lib/interfaces/IMarket';
	import { dragonsForSale,eggsForSale } from '$lib/storage/marketplace';
	import { TokenType } from '$lib/contracts/LoanBook';

	$: contractsData = $contracts;
	$: dragons = $dragonsForSale;
	$: eggs = $eggsForSale

	//Per page is not correctly Integrated. Only pages are been produced
	let show = 1;
	let perpage = 10
	perpage--
	onMount(async () => {
		await LoadInterface(0,perpage);				
	});
</script>

<svelte:head>
	<title>Marketplace - Dragon Masters</title>
</svelte:head>


<MainContainer>
	<h1>Marketplace</h1>

	<div class="btn-group" role="group">
		<button type="button" on:click={() => (show = 1)} class="btn btn-light"
			><i class="fas fa-egg" /> EGGS
		</button>
		<button type="button" on:click={() => (show = 2)} class="btn btn-light"
			><i class="fas fa-dragon" /> DRAGONS
		</button>
	</div>
	{#if show == 1}
		<MarketGrid assets={eggs} contract={contractsData} loadPage={LoadInterface} {perpage} _tokenType={TokenType.Egg} />
	{/if}

	{#if show == 2}
		<MarketGrid assets={dragons} contract={contractsData} loadPage={LoadInterface} {perpage} _tokenType={TokenType.Dragon} />
	{/if}
</MainContainer>

<style>
	.btn-group .btn {
		white-space: nowrap;
		margin: 8px;
		font-weight: 600;
		letter-spacing: 0.8px;
	}
</style>
