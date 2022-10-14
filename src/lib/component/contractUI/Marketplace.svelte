<script>
	import { TokenType, OfferType, rentTerms, saleTerms } from '$lib/contracts/Marketplace';
	
	export let contract;

	let offerId,
		sellId,
		rentId,
		buyId,
		removeId,
		removeRentId,
		removeAllId,
		startIndex = 0,
		endIndex = 10,
		_offerType,
		account,
		_tokenType;

	function sellOffer() {
		contract.setOffer(sellId, OfferType.ForSale, TokenType.Dragon, saleTerms);
	}

	function rentOffer() {
		contract.setOffer(rentId, OfferType.ForRent, TokenType.Dragon, rentTerms);
	}

	async function buy() {
		let offer = await contract.getOffer(buyId, TokenType.Dragon);
		contract.buyToken(buyId, TokenType.Dragon, offer.sellPrice);
	}

	function removeSellOffer() {
		contract.removeOffer(removeId, OfferType.ForSale, TokenType.Dragon);
	}

	function removeRentOffer() {
		contract.removeOffer(removeRentId, OfferType.ForRent, TokenType.Dragon);
	}

	function removeAllOffers() {
		contract.removeAllOffers(removeAllId, TokenType.Dragon);
	}

	function getOffersBy() {
		contract.getOfferedBy(startIndex, endIndex, _offerType, _tokenType, account, true);
	}

	function getAllOffers() {
		contract.getOffered(startIndex, endIndex, _offerType, _tokenType, true);
	}
</script>

<h1 class="mb-4">Offers</h1>

<div class="row">
	<!-- SETTERS -->
	<div class="col-sm-4">
		<div class="grid">
			<h2>Set Sell Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={sellId} class="form-control" placeholder="Token Id" />
			</div>
			<select class="form-select mb-3" bind:value={_tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<button class="btn btn-dark" on:click={() => sellOffer()}>SET FOR SELL OFFER</button>
		</div>

		<div class="grid">
			<h2>Set Rent Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={rentId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => rentOffer()}>SET RENT OFFER</button>
		</div>

		<div class="grid">
			<h2>Buy Token</h2>
			<div class="mb-3">
				<input type="text" bind:value={buyId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => buy()}>Buy Token</button>
		</div>
	</div>
	<!-- GETTERS -->
	<div class="col-sm-4">
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

	<div class="col-sm-4">
		<!-- REMOVE -->
		<div class="grid">
			<h2>Remove All Offers</h2>
			<div class="mb-3">
				<input type="text" bind:value={removeAllId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeAllOffers()}>REMOVE ALL</button>
		</div>

		<div class="grid">
			<h2>Remove Sell Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={removeId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeSellOffer()}>REMOVE SELL OFFER</button>
		</div>

		<div class="grid">
			<h2>Remove Rent Offer</h2>
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
