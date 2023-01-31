<script>
	import { TokenType, OfferType } from '$lib/contracts/Marketplace';
	import { getWei, timeDropdrown } from '$lib/helpers/utils';

	export let contract;

	let offerId,
		sellId,
		sale_price,
		rentId,
		rentalId,
		buyId,
		rent_price,
		rent_deposit,
		rent_duration,
		removeId,
		removeRentId,
		removeAllId,
		startIndex = 0,
		endIndex = 10,
		_offerType,
		account,
		_tokenType;

	async function setSellOffer() {
		const saleTerms = {
			price: await getWei(sale_price),
			rental: {
				deposit: 0,
				minDuration: 0
			}
		}
		contract.setOffer(sellId, OfferType.ForSale, _tokenType, saleTerms);
	}

	async function setRentOffer() {
		const rentTerms = {
			price: await getWei(rent_price),
			rental: {
				deposit: await getWei(rent_deposit),
				minDuration: rent_duration * timeDropdrown.oneDay
			}
		};		
		contract.setOffer(rentId, OfferType.ForRent, _tokenType, rentTerms);
	}

	function getOffersBy() {
		contract.getOfferedBy(startIndex, endIndex, _offerType, _tokenType, account, true);
	}

	function getAllOffers() {
		contract.getOffered(startIndex, endIndex, _offerType, _tokenType, true);
	}

	async function buy() {
		let offer = await contract.getOffer(buyId, _tokenType);
		contract.buyToken(buyId, _tokenType, offer.sellPrice);
	}

	async function rent() {
		let offer = await contract.getOffer(rentalId, _tokenType);		
		contract.rentToken(rentalId, _tokenType, offer.rent.price,offer.rent.deposit);
	}

	function removeSellOffer() {
		contract.removeOffer(removeId, OfferType.ForSale, _tokenType);
	}

	function removeRentOffer() {
		contract.removeOffer(removeRentId, OfferType.ForRent, _tokenType);
	}

	function removeAllOffers() {
		contract.removeAllOffers(removeAllId, _tokenType);
	}
</script>

<h1 class="mb-4">Marketplace Offers</h1>
<p><i>Note: An owner must grant (operator) approval on their Dragon and Egg tokens before offering them in the Marketplace.</i></p>
<br>
<div class="row">
	<!-- SETTERS -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Create 'for sale' offer</h2>

			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token ID</p>
				<input type="text" bind:value={sellId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Price</p>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="price"
					placeholder="0.0"
					bind:value={sale_price}
				/>
				<label for="price">Asking price (Eth) </label>
			</div>
			<button class="btn btn-dark" on:click={() => setSellOffer()}>OFFER 'FOR SALE'</button>
		</div>
		<div class="grid">
			<h2>Create 'for rent' offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token ID</p>
				<input type="text" bind:value={rentId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Rental Terms</p>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="price"
					placeholder="Price in Eth"
					bind:value={rent_price}
				/>
				<label for="price">Asking price/fee (Eth) </label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="deposit"
					placeholder="Amount in Eth"
					bind:value={rent_deposit}
				/>
				<label for="deposit">Returnable Deposit (Eth)</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="duration"
					placeholder="Time to rent"
					bind:value={rent_duration}
				/>
				<label for="duration">Minimum rental duration (days)</label>
			</div>

			<button class="btn btn-dark" on:click={() => setRentOffer()}>OFFER 'FOR RENT'</button>
		</div>

		<div class="grid">
			<h2>Buy Token</h2>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={buyId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => buy()}>Buy Token</button>
		</div>

		
		<div class="grid">
			<h2>Rent Token</h2>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={rentalId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => rent()}>Rent Token</button>
		</div>
	</div>
	<!-- GETTERS -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Get Offer</h2>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={offerId} class="form-control" placeholder="Token Id" />
			</div>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>

			<button class="btn btn-dark" on:click={() => contract.getOffer(offerId, _tokenType, true)}
				>GET OFFER</button
			>
		</div>

		<div class="grid">
			<h2>Get All Offers</h2>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={_offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<button class="btn btn-dark" on:click={() => getAllOffers()}>GET ALL</button>
		</div>

		<div class="grid">
			<h2>Get Offers By</h2>
			<p>From specific address (if pass address, will use current one)</p>
			<p class="bold">Address</p>
			<input type="text" bind:value={account} class="form-control mb-3" placeholder="Address" />

			<p class="bold">Offer Type</p>

			<select class="form-select mb-3" bind:value={_offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>

			<p class="bold">Token Type</p>

			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<button class="btn btn-dark" on:click={() => getOffersBy()}>GET ALL</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<!-- REMOVE -->
		<div class="grid">
			<h2>Remove All Offers</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={removeAllId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeAllOffers()}>REMOVE ALL</button>
		</div>

		<div class="grid">
			<h2>Remove Sell Offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={removeId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeSellOffer()}>REMOVE SELL OFFER</button>
		</div>

		<div class="grid">
			<h2>Remove Rent Offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={removeRentId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeRentOffer()}>REMOVE RENT OFFER</button>
		</div>
	</div>
</div>

<style>
	.grid {
		margin-bottom: 20px;
	}
</style>
