<script>
	import OfferBtn from '$lib/component/marketplace/OfferBtn.svelte';
	import OfferTerms from '$lib/component/marketplace/OfferTerms.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';

	export let openSellOption;
	export let openRentOption;
	export let isOwner;
	export let dragon;
	export let buyToken;
	export let rentToken;
	export let isForSale;
	export let isForRent;
	export let account;
	export let rentTerms;
	export let rentPrice;
	export let price;
</script>

{#if isForSale}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>For Sale</h3>
			{#if isOwner}
				<div class="divBtn">
					<button on:click={openSellOption} class="btn btn-light"
						><i class="fas fa-edit" /> Edit</button
					>
				</div>
			{/if}
		</div>
		<hr />
		<div>
			<h3>
				Price:
				{price} <i class="fab fa-ethereum" />
			</h3>
		</div>
		{#if !isOwner}
			<OfferBtn
				classicBtn={true}
				_offerType={OfferType.ForSale}
				buy={() => buyToken()}
				rent={() => rentToken()}
				{dragon}
				{account}
				displayOwner={true}
			/>
		{/if}
	</div>
{/if}
<!-- RENT OFFER -->
{#if isForRent}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>Rent Offer</h3>
			{#if isOwner}
				<div class="divBtn">
					<button on:click={openRentOption} class="btn btn-light"
						><i class="fas fa-edit" /> Edit</button
					>
				</div>
			{/if}
		</div>
		<hr />
		<OfferTerms _offerType={OfferType.ForRent} {rentTerms} {isForSale} salePrice={rentPrice} />
		{#if !isOwner}
			<OfferBtn
				classicBtn={true}
				_offerType={OfferType.ForRent}
				buy={() => buyToken()}
				rent={() => rentToken()}
				{dragon}
				{account}
				displayOwner={true}
			/>
		{/if}
	</div>
{/if}

<style>
	h3 {
		margin: 0px;
		white-space: nowrap;
	}

	.divBtn {
		width: 100%;
		text-align: right;
	}

	.divBtn button {
		width: fit-content;
		font-size: 16px;
		margin-top: -5px;
	}

	hr {
		margin-top: 10px;
	}

	.btn-light:hover {
		background-color: rgb(187, 187, 187);
		border-radius: 8px;
	}
</style>
