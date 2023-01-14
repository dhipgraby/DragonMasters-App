<script>

import { OfferType } from "$lib/contracts/Marketplace";
    
export let setOfferType;
export let _offerType;    

</script>

<div class="btn-group" role="group">
	<button
		type="button"
		on:click={() => setOfferType(OfferType.ForSale)}
		class="btn btn-light {_offerType === OfferType.ForSale ? 'active' : ''}"
		><i class="fas fa-shopping-cart" /> Buy
	</button>
	<button
		type="button"
		on:click={() => setOfferType(OfferType.ForRent)}
		class="btn btn-light {_offerType === OfferType.ForRent ? 'active' : ''}"
	>
		<i class="fas fa-donate" /> Rent
	</button>
	<button
		type="button"
		on:click={() => setOfferType(OfferType.ForSaleOrRent)}
		class="btn btn-light {_offerType === OfferType.ForSaleOrRent ? 'active' : ''}"
	>
		<i class="fas fa-donate" /> All
	</button>
</div>

<style>
	.active {
		background-color: black;
		color: white;
	}
	
	.btn-group .btn {
		white-space: nowrap;
		margin: 8px;
		font-weight: 600;
		letter-spacing: 0.8px;
	}
</style>
