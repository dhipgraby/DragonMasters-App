<script context="module">
	export async function load({ params }) {
		return {
			props: {
				dragonId: params.dragonId
			}
		};
	}
</script>

<script>
	import DragonCard from '$lib/component/dragon/DragonCard.svelte';
    import { DragonContract } from '$lib/contracts/DragonToken';	
	import { onMount } from 'svelte';

	export let dragonId;

	let contract;
	let dragon = [];

	onMount(async () => {
		contract = await new DragonContract();
		dragon = await contract.getDragon(dragonId)
		console.log(dragon)
	});

</script>

<svelte:head>
	<title>Cave - Dragon ID - {dragonId}</title>
	<link href="/css/egg.css" rel="stylesheet" />
</svelte:head>

<h1>Egg id is {dragonId}</h1>

{#if dragon.tokenId}
    <DragonCard {dragon} {contract} />
{:else}
     <h2>Dragon not found...</h2>
{/if}

