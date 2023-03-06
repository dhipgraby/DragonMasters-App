
<script>
	import OfferBtn from '$lib/component/marketplace/OfferBtn.svelte';
	import OfferTerms from '$lib/component/marketplace/OfferTerms.svelte';
	import { OfferType } from '$lib/contracts/Marketplace';
	import { singleDragon } from '$lib/storage/dragon';
	import { onMount } from 'svelte';

	export let openSellOption;
	export let openRentOption;
	export let dragon;
	export let account;
	export let contract;
	export let isOwner;

	let dragonData;
	let isForRent;
	let isForSale;

	onMount(() => {
		dragonData = $singleDragon;
		isForRent = dragonData.isForRent;
		isForSale = dragonData.isForSale;		
	});

	const buyToken = async () => {
		await contract['market'].buy(dragon.tokenId, TokenType.Dragon, dragon.sellOffer.sellPrice);
	};

	const rentToken = async () => {
		await contract['market'].rent(
			dragon.tokenId,
			TokenType.Dragon,
			dragon.rentOffer.rent.price,
			dragon.rentOffer.rent.deposit
		);
	};
</script>

{#if isForSale}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>For Sale</h3>
			{#if isOwner}
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
				{dragon.price} <i class="fab fa-ethereum" />
			</h3>
		</div>
		{#if !isOwner}
			<OfferBtn
				classicBtn={true}
				_offerType={OfferType.ForSale}
				buy={() => buyToken()}
				rent={() => rentToken()}
				{dragon}
				{account}
				displayOwner={true}
			/>
		{/if}
	</div>
{/if}
<!-- RENT OFFER -->
{#if isForRent}
	<div class="attrDiv">
		<div class="d-flex">
			<h3>Rent Offer</h3>
			{#if isOwner}
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
			rentTerms={dragon.rentTerms}
			{isForSale}
			salePrice={dragon.price}
		/>
		{#if !isOwner}
			<OfferBtn
				classicBtn={true}
				_offerType={OfferType.ForRent}
				buy={() => buyToken()}
				rent={() => rentToken()}
				{dragon}
				{account}
				displayOwner={true}
			/>
		{/if}
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
