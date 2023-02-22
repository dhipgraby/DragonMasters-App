<script>
	import { onMount, afterUpdate } from 'svelte';
	import { OfferType, TokenType } from '$lib/contracts/Marketplace';
	import { isOwnerAccount } from '$lib/helpers/utils';
	import { loadContractData } from '$lib/interfaces/Core';
	import SingleDragon from '$lib/component/dragon/SingleDragon.svelte';

	export let data;
	export let dragonId = data.dragonId;
	export let doPromise = false;

	let contract;
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
		doPromise = true;
		contract = await loadContractData();
		await contract.market.isApprovedForAll(TokenType.Dragon);
		dragon = await contract.dragon.getDragon(dragonId);
		isForSale = await contract.market.isOnOffer(dragonId, OfferType.ForSale, TokenType.Dragon);
		isForRent = await contract.market.isOnOffer(dragonId, OfferType.ForRent, TokenType.Dragon);
		owner = await contract.dragon.ownerOf(dragonId);
		account = await contract.dragon.contract.account;
		dragon.owner = owner;
		isOwner = await isOwnerAccount(account, owner);		
		if (isForSale) {
			dragon.sellOffer = await contract.market.getOffer(dragonId, TokenType.Dragon);
			dragon.offer.sellOffer = dragon.sellOffer;
		}
		if (isForRent) {
			dragon.rentOffer = await contract.market.getOffer(dragonId, TokenType.Dragon);
			dragon.offer.rentOffer = dragon.rentOffer;
		}		
	});

	afterUpdate(() => {
		if (doPromise == true) promise = later(500);
	});

	async function updateDragon() {
		dragon = await contract.getDragon(dragonId);
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
