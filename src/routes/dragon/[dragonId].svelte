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
	import SingleDragon from '$lib/component/dragon/SingleDragon.svelte';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { onMount } from 'svelte';

	export let dragonId;

	let contract;
	let dragon = [];
	let energy;

	onMount(async () => {
		contract = await new DragonContract();
		dragon = await contract.getDragon(dragonId);
	});

</script>

<svelte:head>
	<title>Cave - Dragon ID - {dragonId}</title>
	<link href="/css/egg.css" rel="stylesheet" />
</svelte:head>

{#if dragon.tokenId}
	<SingleDragon {dragon} {contract} />
{:else}
	<h2>Dragon not found...</h2>
{/if}

<style>
	h2 {
		margin-top: 50px;
	}
</style>
