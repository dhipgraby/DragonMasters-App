<script>
	import { OfferType } from '$lib/contracts/LoanBook';

	export let _offerType;
	export let rentTerms;
	export let buy;
	export let rent;
	export let isForSale;	
</script>

{#if _offerType == OfferType.ForSale}
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

<style>
	button {
		position: absolute;
		left: 0px;
		bottom: -11px;
		padding: 18px !important;
		width: 100%;
		font-size: 18px;
		border-bottom-right-radius: 17px;
		border-bottom-left-radius: 17px;
		border-top-right-radius: 0px;
		border-top-left-radius: 0px;
	}

	button:hover {
		color: rgb(255, 181, 22);
		opacity: 1;
	}
</style>
