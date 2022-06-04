<script>
	import { TokenType, OfferType, rentTerms, saleTerms } from '$lib/contracts/Marketplace';

	export let contract;

	let approveId;
	let offerId;
	let sellId;
	let rentId;
	let removeId;
	let removeRentId;
	let removeAllId;
	let singleApproval;

	function sellOffer() {
		contract.setOffer(sellId, OfferType.ForSale, TokenType.Dragon, saleTerms);
	}

	function rentOffer() {
		contract.setOffer(rentId, OfferType.ForRent, TokenType.Dragon, rentTerms);
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
</script>

<h1>DragonToken</h1>

<br />

<div class="grid" align="left">
	<button on:click={() => contract.removeApproveForAll()} class="btn btn-danger">
		Remove Approve for all
	</button>

	<table class="table table-striped">
		<tr>
			<h2>Dragons - Is Approve for All</h2>
			<button class="btn btn-dark" on:click={() => contract.isApprovedForAll(true)}
				>Check Approval</button
			>
		</tr>
		<tr>
			<h2>Approve for All</h2>
			<button class="btn btn-dark" on:click={() => contract.approveForAll()}>APPROVE ALL</button>
		</tr>

		<tr>
			<h2>Check Dragon Approval</h2>
			<div class="mb-3">
				<input
					type="text"
					bind:value={singleApproval}
					class="form-control"
					placeholder="Token Id"
				/>
			</div>
			<button class="btn btn-dark" on:click={() => contract.getApproved(singleApproval,true)}
				>Check Approve</button
			>
		</tr>

		<tr>
			<h2>Approve Token</h2>
			<div class="mb-3">
				<input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.approveToken(approveId)}>APPROVE</button
			>
		</tr>

		<tr>
			<h2>Set Sell Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={sellId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => sellOffer()}>SET FOR SELL OFFER</button>
		</tr>

		<tr>
			<h2>Set Rent Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={rentId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => rentOffer()}>SET RENT OFFER</button>
		</tr>

		<tr>
			<h2>Get Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={offerId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getOffer(offerId, TokenType.Dragon)}
				>GET OFFER</button
			>
		</tr>

		<tr>
			<h2>Remove All Offers</h2>
			<div class="mb-3">
				<input type="text" bind:value={removeAllId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeAllOffers()}>REMOVE ALL</button>
		</tr>

		<tr>
			<h2>Remove Sell Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={removeId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeSellOffer()}>REMOVE SELL OFFER</button>
		</tr>

		<tr>
			<h2>Remove Rent Offer</h2>
			<div class="mb-3">
				<input type="text" bind:value={removeRentId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => removeRentOffer()}>REMOVE RENT OFFER</button>
		</tr>
	</table>
</div>

<style>
	.btn-danger {
		font-size: 12px;
		float: right;
		margin-bottom: 20px;
	}
</style>
