<script>
	import { OfferType } from '$lib/contracts/LoanBook';
	export let owner;
	export let price;
	export let buy;
	export let rent;
	export let _offerType;
</script>

<div class="priceDiv">
	<small><b>Owner</b>: {owner}</small>
	<p>
		<b>Price:</b>
		{price} <i class="fab fa-ethereum" />
	</p>
</div>
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
