<script>
	import { onMount, afterUpdate } from 'svelte';
	import { singleDragon } from '$lib/storage/dragon';
	import { LoadInterface } from '$lib/interfaces/IDragon';
	import DragonTemplate from '$lib/component/dragon/DragonTemplate.svelte';

	export let data;
	export let dragonId = data.dragonId;
	export let doPromise = false;

	$: dragon = $singleDragon;
	let promise;
	let account;

	onMount(async () => {
		doPromise = true;
		await LoadInterface(dragonId);
		account = dragon.account;
	});

	afterUpdate(() => {
		if (doPromise == true) promise = later(500);
	});

	async function updateDragon() {
		await LoadInterface(dragonId);
	}

	async function later(delay) {
		return new Promise(async (resolve) => setTimeout(resolve, delay, true));
	}
</script>

<svelte:head>
	<title>Cave - Dragon ID - {dragonId}</title>
</svelte:head>
<div class="container">
	{#if doPromise == true}
		{#await promise}
			<h2>Loading...</h2>
		{:then ready}
			{#if dragon?.dragon?.tokenId}
				<DragonTemplate
					on:update={updateDragon}
					dragon={dragon.dragon}
					contract={dragon.contract}
					{account}
				/>
			{:else}
				<h2>Dragon not found...</h2>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{:else}
		<h2>Dragon not found...</h2>
	{/if}
</div>

<style>
	h2 {
		margin-top: 50px;
	}
</style>
