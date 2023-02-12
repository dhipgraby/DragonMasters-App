<script>
	import { OfferType } from '$lib/contracts/Marketplace';

	export let setOfferType;
	export let _offerType;
</script>

<div class="row">
	<div class="col">
		<button
			type="button"
			on:click={() => setOfferType(OfferType.ForSale)}
			class="btn darkBtn {_offerType === OfferType.ForSale ? 'active' : ''}"
			><i class="fas fa-shopping-cart" /> For Sale
		</button>
	</div>
	<div class="col">
		<button
			type="button"
			on:click={() => setOfferType(OfferType.ForRent)}
			class="btn darkBtn {_offerType === OfferType.ForRent ? 'active' : ''}"
		>
			<i class="fas fa-donate" /> For Rent
		</button>
	</div>
	<div class="col">
		<button
			type="button"
			on:click={() => setOfferType(OfferType.ForSaleOrRent)}
			class="btn darkBtn {_offerType === OfferType.ForSaleOrRent ? 'active' : ''}"
		>
			<i class="fas fa-donate" /> All
		</button>
	</div>
</div>

<style>
	.row {
		max-width: 650px;
	}
	.col {
		width: fit-content;
	}
	i {
		color: white;
	}
</style>
