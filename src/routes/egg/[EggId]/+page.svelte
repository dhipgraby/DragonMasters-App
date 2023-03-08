<script>
	import { onMount, afterUpdate } from 'svelte';
	import { singleEgg } from '$lib/storage/eggs';
	import { LoadInterface } from '$lib/interfaces/IDragon';
	import DragonTemplate from '$lib/component/dragon/DragonTemplate.svelte';

	export let data;
	export let eggId = data.eggId;
	export let doPromise = false;

	$: egg = $singleEgg;
	let promise;
	let account;

	onMount(async () => {
		doPromise = true;
		await LoadInterface(eggId);
		account = egg.account;
	});

	afterUpdate(() => {
		if (doPromise == true) promise = later(500);
	});

	async function updateDragon() {
		await LoadInterface(eggId);
	}

	async function later(delay) {
		return new Promise(async (resolve) => setTimeout(resolve, delay, true));
	}
</script>

<svelte:head>
	<title>Cave - Egg ID - {eggId}</title>
</svelte:head>
<div class="container">
	{#if doPromise == true}
		{#await promise}
			<h2>Loading...</h2>
		{:then ready}
			{#if egg?.egg?.tokenId}
				<DragonTemplate
					on:update={updateDragon}
					dragon={egg.egg}
					contract={egg.contract}
					{account}
				/>
			{:else}
				<h2>Egg not found...</h2>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{:else}
		<h2>Egg not found...</h2>
	{/if}
</div>

<style>
	h2 {
		margin-top: 50px;
	}
</style>
