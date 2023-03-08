<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { loadOwner } from '$lib/helpers/utils.js';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import { singleOffer } from '$lib/storage/dragon';
	import SellOption from '../marketplace/SellOption.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';
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

	$: offer = $singleOffer;
	$: isForRent = offer.isForRent;
	$: isForSale = offer.isForSale;
	let owner;

	onMount(async () => {
		owner = loadOwner(account, dragon.owner);
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
			case 'buyed':
				handleBuy();
				break;
			case 'rented':
				handleRent(event);
				break;
		}
	}
	// HANDLE OFFERS OWNER FUNCTION
	function handleSetOffer(event) {
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
			deleteSellStorage();
		} else {
			dragon.offer.rentOffer = null;
			isForRent = false;
			deleteRentStorage();
		}
	}

	function updateOffer(offer) {
		if (offer.offerType == OfferType.ForSale) {
			dragon.offer.sellOffer = offer;
			dragon.price = offer.price;
			isForSale = true;
			updateSellStorage(offer);
		} else {
			dragon.offer.rentOffer = offer;
			dragon.rentTerms = offer.rentTerms;
			isForRent = true;
			updateRentStorage(offer);
		}
		console.log('updated dragon', dragon);
	}

	function deleteSellStorage() {
		let currentOffer = get(singleOffer);
		currentOffer.isForSale = false;
		currentOffer.sellOffer = null;
		singleOffer.set(currentOffer);
	}

	function deleteRentStorage() {
		let currentOffer = get(singleOffer);
		currentOffer.isForRent = false;
		currentOffer.rentOffer = null;
		singleOffer.set(currentOffer);
	}

	function updateSellStorage(offer) {
		let currentOffer = get(singleOffer);
		currentOffer.isForSale = true;
		currentOffer.sellOffer = offer;
		singleOffer.set(currentOffer);
	}

	function updateRentStorage(offer) {
		let currentOffer = get(singleOffer);
		currentOffer.isForRent = true;
		currentOffer.rentOffer = offer;
		currentOffer.rentTerms = offer.rentTerms;
		singleOffer.set(currentOffer);
	}

	// HANDLE BUY & RENT
	function handleBuy() {
		isForSale = false;
		isForRent = false;
		isOwner = true;
		dragon.owner = account;
		owner = loadOwner(account, dragon.owner);
	}

	function handleRent() {
		isForSale = false;
		isForRent = false;
		isOwner = true;
		dragon.owner = account;
		owner = loadOwner(account, dragon.owner);
	}
</script>

<div class="mb-4">
	<h1>Dragon #{dragon.tokenId}</h1>
	<p title={dragon.owner}>
		Owned by :
		{#if owner === 'You'}
			<span class="c-purple"><b>{owner}</b></span>
		{:else}
			{owner}
		{/if}
	</p>
</div>
<!-- SELL OFFER -->
<Offers
	bind:this={modaComponent}
	on:buyed={formHanlders}
	on:rented={formHanlders}
	{isOwner}
	{isForRent}
	{isForSale}
	{openSellOption}
	{openRentOption}
	{dragon}
	{account}
	{contract}
/>
<!-- ACTIONS -->
{#if isOwner}
	<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
{/if}
<!-- HANDLE OFFERS MODAL -->
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
