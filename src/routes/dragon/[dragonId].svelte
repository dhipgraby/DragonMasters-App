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
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { onMount, afterUpdate } from 'svelte';
	import SingleDragon from '$lib/component/dragon/SingleDragon.svelte';

	export let dragonId;
	export let doPromise = false;

	let contract;
	let dragon = [];
	let promise
	

	onMount(async () => {
		contract = await new DragonContract();		
		dragon = await contract.getDragon(dragonId);
		doPromise = true
	});


	async function updateDragon() {
		dragon = await contract.getDragon(dragonId);
	}

	afterUpdate(() => {
		if (doPromise == true) promise = later(500);
	});

	async function later(delay) {
		return new Promise(async (resolve) =>
		setTimeout(resolve, delay, true)			
		);
	}
</script>

<svelte:head>
	<title>Cave - Dragon ID - {dragonId}</title>
</svelte:head>

{#if doPromise == true}
	{#await promise}
		<h2>Loading...</h2>
		{:then ready}
		{#if dragon.tokenId}				
			<SingleDragon on:update={updateDragon} {dragon} {contract} />
		{:else}
			<h2>Dragon not found...</h2>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{:else}
	<h2>Dragon not found...</h2>
{/if}

<style>
	h2 {
		margin-top: 50px;
	}
</style>
