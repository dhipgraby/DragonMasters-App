<script>
	import { onMount } from 'svelte';	
	import { LoadInterface } from '$lib/interfaces/IMarket';
	import MainContainer from '$lib/component/containers/MainContainer.svelte';
	import { dragonsForSale } from "$lib/storage/marketplace";

	$: dragons = $dragonsForSale

	onMount(async () => {	
		await LoadInterface();		
		console.log(dragons)
	});
</script>

<svelte:head>
	<title>Marketplace - Dragon Masters</title>
</svelte:head>

<MainContainer>
	<h1>Marketplace</h1>
</MainContainer>
