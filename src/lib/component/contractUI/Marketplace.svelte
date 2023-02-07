<script>
	import { TokenType, OfferType } from '$lib/contracts/Marketplace';
	import { getWei, timeDropdrown } from '$lib/helpers/utils';

	export let contract;

	let tokenId,
		sale_price,
		rent_price,
		rent_deposit,
		rent_duration,
		new_sale_price,
		new_rent_price,
		new_rent_deposit,
		new_rent_duration,
		startIndex = 0,
		endIndex = 10,
		offerType,
		tokenType,
		owner;


	//*** Configuration of Marketplace & LoanBook ***
	let contractAddress;
	// let offerType;
	// let tokenType;

	async function registerToken() {
		contract.registerToken(contractAddress, offerType, tokenType, true);
	}

	async function isRegistered() {
		contract.isRegistered(tokenType, true);
	}

	async function getRegistered() {
		contract.getRegistered(tokenType, true);
	}

	async function getSupportedOfferType() {
		contract.getSupportedOfferType(tokenType, true);
	}

	async function isSellable() {
		contract.isSellable(tokenType, true);
	}

	async function isRentable() {
		contract.isRentable(tokenType, true);
	}

	async function pauseMarketplace() {
		contract.pauseMarketplace(true);
	}

	async function unpauseMarketplace() {
		contract.unpauseMarketplace(true);
	}

	async function pauseLoanBook() {
		contract.pauseLoanBook(true);
	}

	async function unpauseLoanBook() {
		contract.unpauseLoanBook(true);
	}

	
	//*** Marketplace Offers ***

	async function setSellOffer() {
		const saleTerms = {
			price: await getWei(sale_price),
			rental: {
				deposit: 0,
				minDuration: 0
			}
		}
		contract.setOffer(tokenId, OfferType.ForSale, tokenType, saleTerms, true);
	}

	async function setRentOffer() {
		const rentTerms = {
			price: await getWei(rent_price),
			rental: {
				deposit: await getWei(rent_deposit),
				minDuration: rent_duration * timeDropdrown.oneDay
			}
		};		
		contract.setOffer(tokenId, OfferType.ForRent, tokenType, rentTerms, true);
	}

	async function modifySellOffer() {
		const saleTerms = {
			price: await getWei(new_sale_price),
			rental: {
				deposit: 0,
				minDuration: 0
			}
		}
		contract.modifyOffer(tokenId, OfferType.ForSale, tokenType, saleTerms, true);
	}

	async function modifyRentOffer() {
		const rentTerms = {
			price: await getWei(new_rent_price),
			rental: {
				deposit: await getWei(new_rent_deposit),
				minDuration: new_rent_duration * timeDropdrown.oneDay
			}
		};		
		contract.modifyOffer(tokenId, OfferType.ForRent, tokenType, rentTerms, true);
	}

	function getNumOffered() {
		contract.getNumOffered(offerType, tokenType, true);
	}

	function getAllOffers() {
		contract.getOffered(startIndex, endIndex, offerType, tokenType, true);
	}

	function getNumOfferedBy() {
		contract.getNumOfferedBy(owner, offerType, tokenType, true);
	}

	function getOffersBy() {
		contract.getOfferedBy(startIndex, endIndex, offerType, tokenType, owner, true);
	}

	function isOnOffer() {
		contract.isOnOffer(tokenId, offerType, tokenType, true);
	}

	function getOffer() {
		contract.getOffer(tokenId, tokenType, true);
	}

	function getOfferTerms() {
		contract.getOfferTerms(tokenId, offerType, tokenType, true);
	}

	function removeSellOffer() {
		contract.removeOffer(tokenId, OfferType.ForSale, tokenType, true);
	}

	function removeRentOffer() {
		contract.removeOffer(tokenId, OfferType.ForRent, tokenType, true);
	}

	function removeAllOffers() {
		contract.removeAllOffers(tokenId, tokenType, true);
	}

	async function buy() {
		let offer = await contract.getOffer(tokenId, tokenType);
		contract.buy(tokenId, tokenType, offer.sellPrice, true);
	}

	async function rent() {
		let offer = await contract.getOffer(tokenId, tokenType);		
		contract.rent(tokenId, tokenType, offer.rent.price, offer.rent.deposit, true);
	}

	async function endRental() {
		contract.endRental(tokenId, tokenType, true);
	}

</script>

<h1 class="mb-4">Configuration (of Marketplace & LoanBook)</h1>
<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Register ERC721 contract</h2>
			<p><i>Only Marketplace's owner may add support for a token contract.</i></p>
			<p class="bold">Contract address</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={contractAddress} placeholder="Address" />
			</div>
			<p class="bold">Name of 'Token Type'</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale (only)</option>
				<option value={OfferType.ForRent}>For Rent (only)</option>
				<option value={OfferType.ForSaleOrRent}>For Sale and/or Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => registerToken()}>REGISTER</button>
		</div>

		<div class="grid">
			<h2>Is contract supported?</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => isRegistered()}>CHECK</button>
		</div>

		<div class="grid">
			<h2>Get contract address</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => getRegistered()}>GET ADDRESS</button>
		</div>
	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">

		<div class="grid">
			<h2>Get supported offer types</h2>
			<p class="bold">Token Type (contract)</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => getSupportedOfferType()}>GET TYPES</button>
		</div>

		<div class="grid">
			<h2>Is sellable?</h2>
			<p class="bold">Token Type (contract)</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => isSellable()}>CHECK</button>
		</div>

		<div class="grid">
			<h2>Is rentable?</h2>
			<p class="bold">Token Type (contract)</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dna}>Dna</option>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => isRentable()}>CHECK</button>
		</div>

	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<!-- PAUSE / UNPAUSE MARKETPALCE AND LOANBOOK-->
		<div class="grid">
			<h2>Pause Marketplace</h2>
			<p><i>Executable by Marketplace's owner</i></p>
			<button class="btn btn-dark" on:click={() => pauseMarketplace()}>PAUSE</button>
		</div>
		<div class="grid">
			<h2>Unpause Marketplace</h2>
			<p><i>Executable by Marketplace's owner</i></p>
			<button class="btn btn-dark" on:click={() => unpauseMarketplace()}>UNPAUSE</button>
		</div>
		<div class="grid">
			<h2>Pause LoanBook</h2>
			<p><i>Executable by Marketplace's owner</i></p>
			<button class="btn btn-dark" on:click={() => pauseLoanBook()}>PAUSE</button>
		</div>
		<div class="grid">
			<h2>Unpause LoanBook</h2>
			<p><i>Executable by Marketplace's owner</i></p>
			<button class="btn btn-dark" on:click={() => unpauseLoanBook()}>UNPAUSE</button>
		</div>
	</div>
</div>

<h1 class="mb-4">Marketplace Offers</h1>
<p><i>Note: An owner must grant (operator) approval on their Dragon and Egg tokens before offering them in the Marketplace.</i></p>
<br>
<div class="row">
	<!-- SETTERS -->
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Create 'for sale' offer</h2>

			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
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
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
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
			<h2>Modify 'for sale' offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Price</p>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="price"
					placeholder="0.0"
					bind:value={new_sale_price}
				/>
				<label for="price">Asking price (Eth) </label>
			</div>
			<button class="btn btn-dark" on:click={() => modifySellOffer()}>MODIFY 'FOR SALE' OFFER</button>
		</div>

		<div class="grid">
			<h2>Modify 'for rent' offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Rental Terms</p>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="price"
					placeholder="Price in Eth"
					bind:value={new_rent_price}
				/>
				<label for="price">Asking price/fee (Eth) </label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="deposit"
					placeholder="Amount in Eth"
					bind:value={new_rent_deposit}
				/>
				<label for="deposit">Returnable Deposit (Eth)</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="number"
					class="form-control"
					id="duration"
					placeholder="Time to rent"
					bind:value={new_rent_duration}
				/>
				<label for="duration">Minimum rental duration (days)</label>
			</div>
			<button class="btn btn-dark" on:click={() => modifyRentOffer()}>MODIFY 'FOR RENT' OFFER</button>
		</div>

	</div>

	<!-- GETTERS -->
	<div class="col-sm-12 col-md-12 col-xl-4">

		<div class="grid">
			<h2>Get number offered</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => getNumOffered()}>GET AMOUNT</button>
		</div>

		<div class="grid">
			<h2>Get all offers</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => getAllOffers()}>GET TOKEN IDS</button>
		</div>

		<div class="grid">
			<h2>Get number offered by</h2>
			<p class="bold">Owner</p>
			<div class="mb-3">
				<input type="text" class="form-control" bind:value={owner} placeholder="Address" />
			</div>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => getNumOfferedBy()}>GET AMOUNT</button>
		</div>

		<div class="grid">
			<h2>Get offered by</h2>
			<p class="bold">Owner</p>
			<input type="text" bind:value={owner} class="form-control mb-3" placeholder="Address (default current)" />
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => getOffersBy()}>GET TOKEN IDS</button>
		</div>

		<div class="grid">
			<h2>Is on offer?</h2>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => isOnOffer()}>CHECK</button>
		</div>

		<div class="grid">
			<h2>Get offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => getOffer()}>GET OFFER</button>
		</div>

		<div class="grid">
			<h2>Get offer terms</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<p class="bold">Offer Type</p>
			<select class="form-select mb-3" bind:value={offerType}>
				<option value={OfferType.ForSale} selected>For Sale</option>
				<option value={OfferType.ForRent}>For Rent</option>
			</select>
			<button class="btn btn-dark" on:click={() => getOfferTerms()}>GET OFFER TERMS</button>
		</div>

	</div>

	<div class="col-sm-12 col-md-12 col-xl-4">
		<!-- REMOVE OFFERS-->
		<div class="grid">
			<h2>Remove all offers</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeAllOffers()}>REMOVE ALL</button>
		</div>

		<div class="grid">
			<h2>Remove 'for sale' offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeSellOffer()}>REMOVE SELL OFFER</button>
		</div>

		<div class="grid">
			<h2>Remove 'for rent' offer</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<p class="bold">Token Id</p>
			<div class="mb-3">
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeRentOffer()}>REMOVE RENT OFFER</button>
		</div>

		<!-- TAKE AN OFFER - BUY & RENT -->

		<div class="grid">
			<h2>Buy token</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => buy()}>BUY</button>
		</div>

		<div class="grid">
			<h2>Rent token</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => rent()}>RENT</button>
		</div>

		<!-- END A RENTAL -->

		<div class="grid">
			<h2>End Rental (of token)</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Dragon} selected>Dragon</option>
				<option value={TokenType.Egg}>Egg</option>
			</select>
			<div class="mb-3">
				<p class="bold">Token Id</p>
				<input type="text" bind:value={tokenId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => endRental()}>END RENTAL</button>
		</div>
	</div>
</div>

<style>
	.grid {
		margin-bottom: 20px;
	}
</style>
