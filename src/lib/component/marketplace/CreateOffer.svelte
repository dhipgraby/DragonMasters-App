<script>
	import { TokenType, OfferType, saleTerms, rentTerms } from '$lib/contracts/Marketplace';
	import { getWei, timeDropdrown } from '$lib/helpers/utils';
	import { createEventDispatcher } from 'svelte';
	import TimeInputs from './TimeInputs.svelte';

	const dispatch = createEventDispatcher();

	export let contract;
	export let tokenId;
	export let _offerType;

	let price;
	let deposit;
	let duration = 0;

	async function createOffer() {
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

		let offering = await contract.setOffer(tokenId, _offerType, TokenType.Dragon, Terms);
		console.log(offering);
		if (offering.blockHash) {
			dispatch('offerCreated', {
				price: priceInWei,
				name: 'offerCreated'
			});
		}
	}

	function addTime(days) {
		duration += days;
	}
</script>

<h3>Create a {_offerType == OfferType.ForSale ? 'Sale' : 'Rent'} Offer</h3>

<div class="form-floating mb-3">
	<input
		type="number"
		class="form-control"
		id="price"
		placeholder="Price in Eth"
		bind:value={price}
	/>
	<label for="price">Price in Eth</label>
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

<button class="btn btn-success mt-2" on:click={() => createOffer()}>Create Offer</button>
