<script>
	import { onMount, afterUpdate } from 'svelte';
	import { DragonContract } from '$lib/contracts/DragonToken';
	import { MarketplaceContract } from '$lib/contracts/Marketplace';
	import { OfferType, TokenType } from '$lib/contracts/Marketplace';
	import SingleDragon from '$lib/component/dragon/SingleDragon.svelte';
	import { isOwnerAccount } from '$lib/helpers/utils';

	export let data;
	export let dragonId = data.dragonId;
	export let doPromise = false;

	let contract;
	let marketContract;
	let dragon = [];
	let promise;
	let isForSale = false;
	let isForRent = false;
	let owner = '';
	let account = '';
	let isOwner = false;

	$: dragonProps = {
		dragon: dragon,
		contract: contract,
		isForSale: isForSale,
		isForRent: isForRent,
		isOwner: isOwner,
		account
	};

	onMount(async () => {
		contract = await new DragonContract();
		marketContract = await new MarketplaceContract();
		console.log(contract);
		dragon = await contract.getDragon(dragonId);
		doPromise = true;
		isForSale = await marketContract.isOnOffer(dragonId, OfferType.ForSale, TokenType.Dragon);
		isForRent = await marketContract.isOnOffer(dragonId, OfferType.ForRent, TokenType.Dragon);
		owner = await contract.ownerOf(dragonId);
		dragon.owner = owner;
		account = await contract.contract.account;
		isOwner = await isOwnerAccount(account, owner);
		console.log(isOwner);
	});

	async function updateDragon() {
		dragon = await contract.getDragon(dragonId);
	}

	afterUpdate(() => {
		if (doPromise == true) promise = later(500);
	});

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
			{#if dragon.tokenId}
				<SingleDragon on:update={updateDragon} {...dragonProps} />
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
