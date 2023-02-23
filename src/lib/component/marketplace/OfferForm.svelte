<script>
	import ModifyOffer from '../marketplace/ModifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
	import SwitchOfferType from './SwitchOfferType.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';

	export let contract;
	export let offer;
	export let tokenId;
	export let formHanlders;
	export let _tokenType;

	let _offerType = OfferType.NoOffer;
	let showOptions = true;

	function forSale() {
		showOptions = false;
		_offerType = OfferType.ForSale;		
	}

	function forRent() {
		showOptions = false;
		_offerType = OfferType.ForRent;		
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
		<i class="fas fa-chevron-left"></i> Back
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
					{_tokenType}
				/>
			{:else}
				<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} {_tokenType} />
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
					{_tokenType}
				/>
			{:else}
				<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} {_tokenType} />
			{/if}
		{/if}
	{:else}
		<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} {_tokenType} />
	{/if}
{/if}

<style>
	.backBtn {		
		width: fit-content;
		cursor: pointer;
		margin-bottom:15px;
		color: grey;
		font-size: 16px;
		font-weight: 500;
		transition: 0.3s;
	}

	.backBtn:hover {		
		color:black;
		transform: translateX(-5px);
	}
</style>
