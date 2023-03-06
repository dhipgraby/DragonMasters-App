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
	export let _offerType;
	export let doPromise;
	export let isOwner;

	let modaComponent;
	let openSellOption;
	let openRentOption;

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
<Offers bind:this={modaComponent} {isOwner} {openSellOption} {openRentOption} {dragon} {account} {contract} />
<!-- OFFER MODAL -->
{#if isOwner}
	<SellOption
		bind:this={modaComponent}
		{_offerType}
		{doPromise}
		noModal={true}
		tokenProps={dragon}
		contract={contract.market}
		_tokenType={TokenType.Dragon}
	/>
{/if}
