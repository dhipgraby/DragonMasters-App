<script>
	import ModifyOffer from '../marketplace/ModifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
	import SwitchOfferType from './SwitchOfferType.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';

	export let contract;
	export let offer;
	export let tokenId;
	export let formHanlders;

	let _offerType = OfferType.NoOffer;
	let showOptions = true;

	function forSale() {
		showOptions = false;
		_offerType = OfferType.ForSale;
		console.log(_offerType);
	}

	function forRent() {
		showOptions = false;
		_offerType = OfferType.ForRent;
		console.log(offer);
	}
</script>

{#if showOptions}
	<SwitchOfferType {forSale} {forRent} />
{:else}
	<div class="ta-l">
		<p
			class="backBtn"
			on:click={() => {
				showOptions = true;
			}}
		>
			<i class="fas fa-arrow-left" /> Back
		</p>
	</div>

	{#if offer}
		{#if _offerType == OfferType.ForSale}
			{#if offer.sellOffer}
				<ModifyOffer
					on:offerModifyed={formHanlders}
					on:offerRemoved={formHanlders}
					offer={offer.sellOffer}
					{tokenId}
					{contract}
					{_offerType}
				/>
			{:else}
				<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} />
			{/if}
		{/if}

		{#if _offerType == OfferType.ForRent}
			{#if offer.rentOffer}
				<ModifyOffer
					on:offerModifyed={formHanlders}
					on:offerRemoved={formHanlders}
					offer={offer.rentOffer}
					{tokenId}
					{contract}
					{_offerType}
				/>
			{:else}
				<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} />
			{/if}
		{/if}
	{:else}
		<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} />
	{/if}
{/if}

<style>
	.backBtn {
		color: grey !important;
		font-size: 20px;
		font-weight: 700;
	}
</style>
