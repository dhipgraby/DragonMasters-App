<script>
	import { onMount } from 'svelte';
	import { loadOwner } from '$lib/helpers/utils.js';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import { singleDragon } from '$lib/storage/dragon';
	import SellOption from '../marketplace/SellOption.svelte';
	import Offers from './Offers.svelte';

	export let dragon;
	export let contract;
	export let account;
	export let _offerType;
	export let doPromise;
	export let isOwner;

	let modaComponent;
	let openSellOption;
	let openRentOption;

	let dragonData;
	let isForRent;
	let isForSale;

	onMount(async () => {
		console.log(dragon);
		dragonData = $singleDragon;
		isForRent = dragonData.isForRent;
		isForSale = dragonData.isForSale;

		openSellOption = function () {
			modaComponent.openModal();
			_offerType = OfferType.ForSale;
		};

		openRentOption = function () {
			modaComponent.openModal();
			_offerType = OfferType.ForRent;
		};
	});

	function formHanlders(event) {
		let eventName = event.detail.name;
		switch (eventName) {
			case 'offerCreated':
				handleSetOffer(event);				
				break;
			case 'offerModifyed':
				handleModifyOffer(event);
				break;
			case 'offerRemoved':
				handleRemoveOffer(event);
				break;
		}
	}

	function handleSetOffer(event) {
		console.log('offer created', event);
		updateOffer(event.detail.offer);
	}

	function handleModifyOffer(event) {
		updateOffer(event.detail.offer);
	}

	function handleRemoveOffer(event) {
		let offerType = event.detail.offerType;
		if (offerType == OfferType.ForSale) {
			dragon.offer.sellOffer = null;
			isForSale = false;
		} else {
			dragon.offer.rentOffer = null;
			isForRent = false;
		}
	}

	function updateOffer(offer) {
		if (offer.offerType == OfferType.ForSale) {
			dragon.offer.sellOffer = offer;
			dragon.price = offer.price;
			isForSale = true;
		} else {
			dragon.offer.rentOffer = offer;
			isForRent = true;
		}
		console.log('updated dragon',dragon);
	}
</script>

<div class="mb-4">
	<h1>Dragon #{dragon.tokenId}</h1>
	<p title={dragon.owner}>Owned by : {@html loadOwner(account, dragon.owner)}</p>
</div>
<!-- SELL OFFER -->
<Offers
	bind:this={modaComponent}
	{isOwner}
	{isForRent}
	{isForSale}
	{openSellOption}
	{openRentOption}
	{dragon}
	{account}
	{contract}
/>
<!-- OFFER MODAL -->
{#if isOwner}
	<SellOption
		bind:this={modaComponent}
		{formHanlders}
		{_offerType}
		{doPromise}
		noModal={true}
		tokenProps={dragon}
		contract={contract.market}
		_tokenType={TokenType.Dragon}
	/>
{/if}
