<script>
	import { createEventDispatcher } from 'svelte';
	import OfferBtn from '$lib/component/marketplace/OfferBtn.svelte';
	import OfferTerms from '$lib/component/marketplace/OfferTerms.svelte';
	import { OfferType, TokenType } from '$lib/contracts/Marketplace';

	export let offer;
	export let tokenId;
	export let contract;
	export let openSellOption;
	export let openRentOption;			
		
	const dispatch = createEventDispatcher();

	const buyToken = async () => {
		const tx = await contract['market'].buy(tokenId, TokenType.Dragon, offer.sellOffer.sellPrice);
		if (tx.blockHash) {
			dispatch('buyed', {
				name: 'buyed'
			});
		}
	};

	const rentToken = async () => {
		const tx = await contract['market'].rent(
			tokenId,
			TokenType.Dragon,
			offer.rentOffer.rent.price,
			offer.rentOffer.rent.deposit
		);

		if (tx.blockHash) {
			dispatch('rented', {
				name: 'rented'
			});
		}
	};
</script>

{#if offer.isForSale}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>For Sale</h3>
			{#if offer.isOwner}
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
				{offer.sellOffer.price} <i class="fab fa-ethereum" />
			</h3>
		</div>
		{#if !offer.isOwner}
			<OfferBtn
				buy={() => buyToken()}
				rent={() => rentToken()}
				_offerType={OfferType.ForSale}
				classicBtn={true}
			/>
		{/if}
	</div>
{:else if offer.isOwner}
	<div class="divBtn ta-l mb-3">
		<button on:click={openSellOption} class="btn btn-dark"
			><i class="fas fa-plus" /> Create Sell Offer</button
		>
	</div>
{/if}
<!-- RENT OFFER -->
{#if offer.isForRent}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>Rent Offer</h3>
			{#if offer.isOwner}
				<div class="divBtn">
					<button on:click={openRentOption} class="btn btn-light"
						><i class="fas fa-edit" /> Edit</button
					>
				</div>
			{/if}
		</div>
		<hr />
		<OfferTerms
			_offerType={OfferType.ForRent}
			rentTerms={offer.rentTerms}
			isForSale={offer.isForSale}
			salePrice={offer.rentOffer.price}
		/>
		{#if !offer.isOwner}
			<OfferBtn
				buy={() => buyToken()}
				rent={() => rentToken()}
				_offerType={OfferType.ForRent}
				classicBtn={true}
			/>
		{/if}
	</div>
{:else if offer.isOwner}
	<div class="divBtn ta-l mb-3">
		<button on:click={openRentOption} class="btn btn-dark"
			><i class="fas fa-plus" /> Create Rent Offer</button
		>
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
