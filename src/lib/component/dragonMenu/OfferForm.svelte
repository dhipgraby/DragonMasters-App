<script>
	import ModifyOffer from '../marketplace/modifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
	import SwitchOfferType from './SwitchOfferType.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';

	export let contract;
	export let offer;
	export let tokenId;
	export let formHanlders;

	console.log(offer);

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
			<i class="fas fa-arrow-left" /> Back
		</p>
	</div>
	{#if _offerType == OfferType.ForSale}
		{#if offer}
			<ModifyOffer
				on:offerModifyed={formHanlders}
				on:offerRemoved={formHanlders}
				{offer}
				{tokenId}
				{contract}
				{_offerType}
			/>
		{:else}
			<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} />
		{/if}
	{/if}

	{#if _offerType == OfferType.ForRent}
		{#if offer}
			{#if offer.rent != undefined && offer.rent.price != '0'}
				<ModifyOffer
					on:offerModifyed={formHanlders}
					on:offerRemoved={formHanlders}
					{offer}
					{tokenId}
					{contract}
					{_offerType}
				/>
			{:else}
				<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} {_offerType} />
			{/if}
		{/if}
	{/if}
{/if}

<style>
	.backBtn {
		color: grey !important;
		font-size: 20px;
		font-weight: 700;
	}
</style>
