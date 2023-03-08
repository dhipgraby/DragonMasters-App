<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { TokenType, OfferType, saleTerms, rentTerms } from '$lib/contracts/Marketplace';
	import { getEth, getWei, timeDropdrown } from '$lib/helpers/utils';

	const dispatch = createEventDispatcher();

	export let contract;
	export let offer;
	export let tokenId;
	export let _offerType;
	export let _tokenType;

	console.log(contract);

	let price;
	let deposit;
	let duration;
	let tap = 1;
	let currentPrice;

	const changeTap = (num) => {
		tap = num;
	};

	async function removeOffer() {
		let offerRemove = await contract.removeOffer(tokenId, _offerType, _tokenType);
		console.log('offerRemove', offerRemove);
		if (offerRemove.blockHash) {
			dispatch('offerRemoved', {
				name: 'offerRemoved',
				offerType: _offerType
			});
		}
	}

	async function modifyOffer() {
		let Terms;
		let rent = null;
		let priceInWei = await getWei(price);
		let depositInWei;

		if (_offerType == OfferType.ForSale) {
			Terms = saleTerms;
			Terms.price = priceInWei;
		} else {
			depositInWei = await getWei(deposit);
			Terms = rentTerms;
			Terms.price = priceInWei;
			Terms.rental.deposit = depositInWei;
			Terms.rental.minDuration = duration * timeDropdrown.oneDay;
			rent = true;
		}

		let modifying = await contract.modifyOffer(tokenId, _offerType, _tokenType, Terms);
		let _rentTerms =
			rent == true
				? {
						price: price,
						deposit: deposit,
						duration: duration + ' days'
				  }
				: null;
		let rentalTerms =
			rent == true
				? {
						price: priceInWei,
						deposit: depositInWei,
						minDuration: Terms.rental.minDuration
				  }
				: null;

		if (modifying.blockHash) {
			let offer = {
				sellPrice: priceInWei,
				price: price,
				offerType: _offerType,
				owner: contract.contract.account,
				rent: rentalTerms,
				rentTerms: _rentTerms,
				tokenId: tokenId,
				tokenType: TokenType.Dragon
			};

			currentPrice = price;
			dispatch('offerModifyed', {
				offer: offer,
				name: 'offerModifyed'
			});
		}
	}

	onMount(async () => {
		await setPrices();
	});

	async function setPrices() {
		if (_offerType == OfferType.ForSale) {
			price = await getEth(offer.sellPrice);
		} else {
			if (_offerType == OfferType.ForRent) {
				price = await getEth(offer.rent.price);
				deposit = await getEth(offer.rent.deposit);
				duration = parseInt(offer.rent.minDuration) / timeDropdrown.oneDay;
			}
		}
		currentPrice = price;
	}
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
		{/if}

		<button class="btn btn-success modifyBtn text-light" on:click={() => modifyOffer()}
			>Confirm</button
		>
	{:else}
		<div class="removeDiv">
			<button class="btn btn-danger text-light mt-4" on:click={() => removeOffer()}>Remove </button>
		</div>
	{/if}
</div>

<style>
	.removeDiv {
		width: 100%;
		text-align: center;
	}

	.removeDiv button {
		width: 100%;
		border-radius: 8px;
	}

	button {
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
		cursor: pointer;
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
