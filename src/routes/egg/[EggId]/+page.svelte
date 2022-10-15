<script>
	import EggCard from '$lib/component/egg/EggCard.svelte';
	import { EggContract } from '$lib/contracts/EggToken';
	import { onMount } from 'svelte';

	export let data;
	
	export let EggId = data.eggId;

	let contract;
	let egg = [];

	onMount(async () => {
		console.log('data:'+ JSON.stringify(data))
		contract = await new EggContract();
		egg = await contract.getEgg(EggId)
		console.log(egg)
	});

</script>

<svelte:head>
	<title>Cave - Egg ID - {EggId}</title>
</svelte:head>

<h1>Egg id is {EggId}</h1>

{#if egg.tokenId}
    <EggCard {egg} {contract} />
{:else}
     <h2>Egg not found...</h2>
{/if}

