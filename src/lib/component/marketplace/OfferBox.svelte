<script>
	import { OfferType } from '$lib/contracts/LoanBook';
	import OfferTerms from './OfferTerms.svelte';

	export let _offerType;	
	export let price;
	export let rentTerms;
	export let buy;
	export let rent;
</script>
{#if _offerType == OfferType.ForSale}
	<OfferTerms {_offerType} {rentTerms} salePrice={price} />
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
	<OfferTerms {_offerType} {rentTerms} salePrice={price} />
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
	<OfferTerms {_offerType} {rentTerms} salePrice={price} />
	<div class="btn btn-group">
		<button
			class="btn btn-dark"
			on:click={async () => {
				await buy();
			}}
		>
			Buy now <i class="fas fa-shopping-cart" />
		</button>
		<button
			class="btn btn-dark"
			on:click={async () => {
				await rent();
			}}
		>
			Rent now <i class="fas fa-shopping-cart" />
		</button>
	</div>
{/if}
