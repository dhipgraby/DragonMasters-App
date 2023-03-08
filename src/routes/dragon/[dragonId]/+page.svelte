<script>
	import { onMount, afterUpdate } from 'svelte';
	import DragonTemplate from '$lib/component/dragon/DragonTemplate.svelte';
	import { singleDragon } from '$lib/storage/dragon';
	import { LoadInterface } from '$lib/interfaces/IDragon';

	export let data;
	export let dragonId = data.dragonId;
	export let doPromise = false;	

	$: dragon = $singleDragon;
	let promise;
	let account;
	let isOwner;

	onMount(async () => {
		doPromise = true;
		await LoadInterface(dragonId);
		account = dragon.account;	
		isOwner= dragon.isOwner	
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
					{isOwner}
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
