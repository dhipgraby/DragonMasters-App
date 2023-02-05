<script>
	import { OfferType } from '$lib/contracts/LoanBook';
	import OfferTerms from './OfferTerms.svelte';

	export let _offerType;
	export let price;
	export let rentTerms;
	export let buy;
	export let rent;
	export let isForSale;

</script>

<div class="offerContainer">
	{#if _offerType == OfferType.ForSale}
		<OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} />
		<button
			class="btn btn-dark"
			on:click={async () => {
				await buy();
			}}
		>
			Buy now <i class="fas fa-shopping-cart" />
		</button>
	{/if}

	{#if _offerType == OfferType.ForRent}
		<OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} />
		<button
			class="btn btn-dark"
			on:click={async () => {
				await rent();
			}}
		>
			Rent now <i class="fas fa-shopping-cart" />
		</button>
	{/if}

	{#if _offerType == OfferType.ForSaleOrRent}
		<OfferTerms {_offerType} {rentTerms} {isForSale} salePrice={price} />
		{#if isForSale}
			<button
				class="btn btn-danger"
				on:click={async () => {
					await buy();
				}}
			>
				Buy now <i class="fas fa-shopping-cart" />
			</button>
		{/if}
		{#if rentTerms}
			<button
				class="btn btn-warning"
				on:click={async () => {
					await rent();
				}}
			>
				Rent now <i class="fas fa-shopping-cart" />
			</button>
		{/if}
	{/if}
</div>

<style>
	button {
		padding: 2px;
		width: 100%;
		margin-bottom: 15px;
		border-radius: 50px;
		
	}
	.offerContainer {
		width: 90%;
		margin: auto;
	}
</style>
