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
		class="btn btn-dark singleButton"
		on:click={async () => {
			await buy();
		}}
	>
		Buy now <i class="fas fa-shopping-cart" />
	</button>
{/if}

{#if _offerType == OfferType.ForRent}
	<button
		class="btn btn-dark singleButton"
		on:click={async () => {
			await rent();
		}}
	>
		Rent now <i class="fas fa-shopping-cart" />
	</button>
{/if}

{#if _offerType == OfferType.ForSaleOrRent}
	<div class="multiButton">
		{#if isForSale}
			<button
				class="btn btn-dark"
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
	</div>
{/if}

<style>

	.multiButton {
		width: 100%;
		position: absolute;
		display: inline-flex;
		left: 0px;
		bottom: 0px;
		margin-top: 10px;
	}

	.multiButton button {
		width: 100%;
		padding: 10px !important;		
		font-size: 18px;
		border-top-right-radius: 0px;
		border-top-left-radius: 0px;
	}


	.multiButton button:hover {		
		opacity: 1;
	}

	.singleButton {
		font-size: 18px;
		padding: 10px !important;	
		border-bottom-right-radius: 17px;
		border-bottom-left-radius: 17px;
		border-top-right-radius: 0px ;
		border-top-left-radius: 0px;
		position: absolute;
		left: 0px;
		bottom: 0px;
	}

	.singleButton:hover {
		color: rgb(255, 181, 22);
		opacity: 1;
	}
</style>
