<script>
	import { onMount } from 'svelte';
	import { loadOwner } from '$lib/helpers/utils.js';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { TokenType } from '$lib/contracts/MarketApproval';	
	import SellOption from '../marketplace/SellOption.svelte';
	import Offers from './Offers.svelte';

	export let dragon;
	export let contract;
	export let account;
	export let isForSale;
	export let isForRent;
	export let isOwner;
	export let openSellOption;
	export let openRentOption;
	export let price;
	export let buyToken;
	export let rentToken;
	export let rentTerms;
	export let rentPrice;
	export let _offerType;
	export let doPromise;

	let modaComponent;

	onMount(async () => {
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
		<h1>Dragon #{dragon.tokenId}</h1>
		<p title={dragon.owner}>Owned by : {@html loadOwner(account, dragon.owner)}</p>
	</div>
	<!-- SELL OFFER -->
	<Offers
		{openSellOption}
		{openRentOption}
		{isOwner}
		{dragon}
		{buyToken}
		{rentToken}
		{isForSale}
		{isForRent}
		{account}
		{rentTerms}
		{rentPrice}
		{price}
	/>
	{#if isOwner}
		<SellOption
			{_offerType}
			bind:this={modaComponent}
			noModal={true}
			tokenProps={dragon}
			contract={contract.market}
			{doPromise}
			_tokenType={TokenType.Dragon}
		/>		
	{/if}
