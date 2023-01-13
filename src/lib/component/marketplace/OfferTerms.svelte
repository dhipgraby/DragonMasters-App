<script>
	import { OfferType } from '$lib/contracts/LoanBook';

	export let _offerType;
	export let rentTerms;
	export let salePrice;
</script>

<div class="priceDiv">
	<p>
		{#if _offerType === OfferType.ForSale}
			<b>Price:</b>
			{salePrice} <i class="fab fa-ethereum" />
		{/if}

		{#if _offerType === OfferType.ForRent}
			{#if rentTerms !== undefined}
				<b>Fee:</b>
				{rentTerms.price} <i class="fab fa-ethereum" />
                <br>
				<b>Deposit:</b>
				{rentTerms.deposit} <i class="fab fa-ethereum" />
                <br>
				<b>Min-duration:</b>
				{rentTerms.duration} <i class="far fa-calendar-alt" />
			{/if}
		{/if}

		{#if _offerType === OfferType.ForSaleOrRent}
			Sale Terms:
            <br>
			<b>Price: </b>
			{salePrice} <i class="fab fa-ethereum" />
			{#if rentTerms !== undefined}
				<b>Fee:</b>
				{rentTerms.price} <i class="fab fa-ethereum" />
                <br>
				<b>Deposit:</b>
				{rentTerms.deposit} <i class="fab fa-ethereum" />
                <br>
				<b>Min-duration:</b>
				{rentTerms.duration} <i class="far fa-calendar-alt" />
			{/if}
		{/if}
	</p>
</div>
