<script context="module">
	export async function load({ params }) {
		return {
			props: {
				EggId: params.EggId
			}
		};
	}
</script>

<script>
	import EggCard from '$lib/component/EggCard.svelte';
	import { EggContract } from '$lib/contracts/methods';
	import { onMount } from 'svelte';

	export let EggId;

	let contract;
	let egg = [];

	onMount(async () => {
		contract = await new EggContract();
		egg = await contract.getEgg(EggId)
		console.log(egg)
	});

</script>

<svelte:head>
	<title>Cave - Egg ID - {EggId}</title>
	<link href="/css/egg.css" rel="stylesheet" />
</svelte:head>

<h1>Egg id is {EggId}</h1>

{#if egg.tokenId}
    <EggCard {egg} {contract} />
{:else}
     <h2>Egg not found...</h2>
{/if}

