<script>
	import { onMount } from 'svelte';
	import { loadOwner } from '$lib/helpers/utils.js';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { TokenType } from '$lib/contracts/MarketApproval';
	import { singleOffer, formHanlders } from '$lib/storage/marketplace';
	import SellOption from './SellOption.svelte';
	import Offers from './Offers.svelte';

	export let asset;
	export let contract;
	export let account;
	export let _offerType;
	export let _tokenType;
	export let doPromise;

	let modaComponent;
	let openSellOption;
	let openRentOption;

	$: offer = $singleOffer;
	$: owner = loadOwner(account, offer.owner);

	console.log(asset);
	onMount(async () => {
		
		owner = loadOwner(account, asset.owner);
		openSellOption = function () {
			modaComponent.openModal();
			_offerType = OfferType.ForSale;
		};
		openRentOption = function () {
			modaComponent.openModal();
			_offerType = OfferType.ForRent;
		};
	});
</script>

<div class="mb-4">
	<h1>{_tokenType === TokenType.Dragon ? 'Dragon # ' : 'Egg # '} {asset.tokenId}</h1>
	<p title={asset.owner}>
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
	tokenId={asset.tokenId}
	{contract}
	{openSellOption}
	{openRentOption}
/>
<!-- HANDLE OFFERS MODAL -->
{#if offer.isOwner}
	<SellOption
		bind:this={modaComponent}
		{formHanlders}
		{offer}
		tokenId={asset.tokenId}
		{_offerType}
		{doPromise}
		noModal={true}
		tokenProps={asset}
		contract={contract.market}
		{_tokenType}
	/>
{/if}
