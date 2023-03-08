<script>
	import { onMount } from 'svelte';
	import { loadOwner } from '$lib/helpers/utils.js';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import {
		singleOffer,
		setNoOffer,
		updateSellStorage,
		updateRentStorage,
		deleteSellStorage,
		deleteRentStorage
	} from '$lib/storage/marketplace';
	import SellOption from '../marketplace/SellOption.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';
	import Offers from './Offers.svelte';

	export let dragon;
	export let contract;
	export let account;
	export let _offerType;
	export let doPromise;

	let modaComponent;
	let openSellOption;
	let openRentOption;

	$: offer = $singleOffer;
	$: owner = loadOwner(account, offer.owner);

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
				updateOffer(event.detail.offer);
				break;
			case 'offerModifyed':
				updateOffer(event.detail.offer);
				break;
			case 'offerRemoved':
				if (event.detail.offerType == OfferType.ForSale) {
					deleteSellStorage();
				} else {
					deleteRentStorage();
				}
				break;
			case 'buyed':
				setNoOffer(true, account);
				break;
			case 'rented':
				setNoOffer(true, account);
				break;
		}
	}
	// HANDLE OFFERS OWNER FUNCTION

	function updateOffer(offer) {
		if (offer.offerType == OfferType.ForSale) {
			updateSellStorage(offer);
		} else {
			updateRentStorage(offer);
		}
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
	{offer}
	tokenId={dragon.tokenId}
	{contract}
	{openSellOption}
	{openRentOption}
/>
<!-- ACTIONS -->
{#if offer.isOwner}
	<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
{/if}
<!-- HANDLE OFFERS MODAL -->
{#if offer.isOwner}
	<SellOption
		bind:this={modaComponent}
		{formHanlders}
		{offer}
		{_offerType}
		{doPromise}
		noModal={true}
		tokenProps={dragon}
		contract={contract.market}
		_tokenType={TokenType.Dragon}
	/>
{/if}
