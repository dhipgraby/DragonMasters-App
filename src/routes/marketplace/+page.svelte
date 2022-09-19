<script>
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import MarketGrid from '$lib/component/marketplace/MarketGrid.svelte';
	import { onMount } from 'svelte';
	import { LoadInterface, contracts } from '$lib/interfaces/IMarket';
	import { dragonsForSale } from '$lib/storage/marketplace';

	$: contractsData = $contracts;
	$: dragons = $dragonsForSale;

	//Per page is not correctly Integrated. Only pages are been produced
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
	<MarketGrid {dragons} contract={contractsData} loadPage={LoadInterface} {perpage} />
</MainContainer>
