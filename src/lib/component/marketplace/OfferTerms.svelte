<script>
	import { OfferType } from '$lib/contracts/LoanBook';

	export let _offerType;
	export let rentTerms;
	export let salePrice;
	export let isForSale;
	
	console.log(rentTerms);
</script>

<div class="priceDiv">
	<p>
		{#if _offerType === OfferType.ForSale}
			<b>Price:</b>
			{salePrice} <i class="fab fa-ethereum" />
		{/if}

		{#if _offerType === OfferType.ForRent}
			{#if rentTerms}
				<b>Fee:</b>
				{rentTerms.price} <i class="fab fa-ethereum" />
				<br />
				<b>Deposit:</b>
				{rentTerms.deposit} <i class="fab fa-ethereum" />
				<br />
				<b>Min-duration:</b>
				{rentTerms.duration} <i class="far fa-calendar-alt" />
			{/if}
		{/if}

		{#if _offerType === OfferType.ForSaleOrRent}
			{#if isForSale}
				<span class="badge bg-danger">Sell Offer:</span>
				<b>Price - </b>
				{salePrice} <i class="fab fa-ethereum" />
			{/if}

			<hr />
			{#if rentTerms}
				<span class="badge bg-warning">Rent Offer:</span>
				<br />
				<b>Fee:</b>
				{rentTerms.price} <i class="fab fa-ethereum" />
				<b>Deposit:</b>
				{rentTerms.deposit} <i class="fab fa-ethereum" />
				<br />
				<b>Min-duration:</b>
				{rentTerms.duration} <i class="far fa-calendar-alt" />
			{/if}
		{/if}
	</p>
</div>

<style>
	.bg-danger {
		font-weight: 700;
		letter-spacing: 1px;
	}

	.bg-warning {
		color: #000;
		font-weight: 700;
		letter-spacing: 1px;
	}

	hr {
		margin-bottom: 10px;
		margin-top: 10px;
	}
</style>
