<script>
	import { TokenType, OfferType } from '$lib/contracts/Marketplace';
	import { getEth } from '$lib/helpers/utils';
	import { onMount } from 'svelte';

	export let offer;
	export let tokenId;

	let price;
	let tap = 1;

	function changeTap(num) {
		tap = num;
	}

	function removeSellOffer() {
		contract.removeOffer(tokenId, OfferType.ForSale, TokenType.Dragon);
	}

	onMount(async () => {
		price = await getEth(offer.sellPrice);
	});
</script>

<h3>Change offer</h3>

<div class="myContainer">
	<div class="row">
		<div on:click={() => changeTap(1)} class="col tap {tap == 1 ? 'active' : ''}">
			<p>Modify Offer</p>
		</div>
		<div on:click={() => changeTap(2)} class="col tap {tap == 2 ? 'active' : ''}">
			<p>Remove Offer</p>
		</div>
	</div>
</div>

<div class="cardBody">
	{#if tap == 1}
		<p class="bold mb-2 mt-3 f-right">
			<i class="fab fa-ethereum" /> Current Price : {price}
		</p>

		<small class="m-0 mb-2 mt-3 f-left"
			><i class="fas fa-cash-register" />
			Change price
		</small>

		<input type="number" class="form-control mt-2" placeholder="Eth" />
		<button class="btn btn-success modifyBtn text-light">Confirm</button>
	{:else}
		<button class="btn btn-danger text-light" on:click={() => removeSellOffer()}>Remove </button>
	{/if}
</div>

<style>
	button {
		position: absolute;
		bottom: 20px;
		left: 20px;
		font-weight: 600;
	}

	.tap {
		padding-top: 10px;
		width: 100%;
		text-align: center;
	}

	.tap p {
		color: rgb(110, 110, 110);
		font-size: 16px;
		font-weight: 700;
		white-space: nowrap;
	}

	.active {
		border-bottom: solid 3px rgb(110, 110, 110);
	}

	.active p {
		color: black;
	}

	.myContainer {
		min-width: 500px;
	}
</style>
