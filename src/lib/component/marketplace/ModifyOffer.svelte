<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { TokenType, OfferType, saleTerms, rentTerms } from '$lib/contracts/Marketplace';
	import { getEth, getWei, timeDropdrown } from '$lib/helpers/utils';
	import TimeInputs from './TimeInputs.svelte';

	const dispatch = createEventDispatcher();

	export let contract;
	export let offer;
	export let tokenId;
	export let _offerType;

	let price;
	let deposit;
	let duration;
	let tap = 1;
	let currentPrice;

	const changeTap = (num) => {
		tap = num;
	};

	async function removeSellOffer() {
		let offerRemove = await contract.removeOffer(tokenId, _offerType, TokenType.Dragon);
		if (offerRemove.blockHash) {
			dispatch('offerRemoved', {
				name: 'offerRemoved'
			});
		}
	}

	async function modifyOffer() {
		let Terms;
		let priceInWei = await getWei(price);

		if (_offerType == OfferType.ForSale) {
			Terms = saleTerms;
			Terms.price = priceInWei;
		} else {
			Terms = rentTerms;
			Terms.rental.price = priceInWei;
			Terms.rental.minDuration = duration * timeDropdrown.oneDay;
		}

		let modifying = await contract.modifyOffer(tokenId, _offerType, TokenType.Dragon, Terms);
		console.log(modifying);
		if (modifying.blockHash) {
			dispatch('offerModifyed', {
				price: priceInWei,
				name: 'offerModifyed'
			});
		}
	}

	function addTime(days) {
		duration += days;
	}

	onMount(async () => {
		price = await getEth(offer.sellPrice);
		currentPrice = await getEth(offer.sellPrice);
		if (offer.rent) {
			deposit = getEth(offer.rent.deposit);
			duration = parseInt(offer.rent.minDuration) / timeDropdrown.oneDay;
		}
	});
</script>

<h3>Change {_offerType == OfferType.ForSale ? 'Sale' : 'Rent'} Offer</h3>

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
			<i class="fab fa-ethereum" /> Current Price : {currentPrice}
		</p>

		<div class="form-floating mb-3">
			<input bind:value={price} type="number" class="form-control mt-2" placeholder="Eth" />
			<label for="price">Price</label>
		</div>

		{#if _offerType == OfferType.ForRent}
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="deposit"
					placeholder="Amount in Eth"
					bind:value={deposit}
				/>
				<label for="deposit">Deposit in Eth</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="duration"
					placeholder="Time to rent"
					bind:value={duration}
				/>
				<label for="floatingPassword">Number of days</label>
			</div>

			<TimeInputs {addTime} />
		{/if}

		<button class="btn btn-success modifyBtn text-light" on:click={() => modifyOffer()}
			>Confirm</button
		>
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
