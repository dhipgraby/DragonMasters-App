<script>
	import { TokenType, OfferType, rentTerms, saleTerms } from '$lib/contracts/Marketplace';

	export let contract;
	
	let approveId,
		offerId,
		sellId,
		rentId,
		removeId,
		removeRentId,
		removeAllId,
		singleApproval,
		revokeId,
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

	function removeSellOffer() {
		contract.removeOffer(removeId, OfferType.ForSale, TokenType.Dragon);
	}

	function removeRentOffer() {
		contract.removeOffer(removeRentId, OfferType.ForRent, TokenType.Dragon);
	}

	function removeAllOffers() {
		contract.removeAllOffers(removeAllId, TokenType.Dragon);
	}

	function getOffers() {
		contract.getOfferedBy(startIndex, endIndex, _offerType, _tokenType, account, true);
	}
</script>

<h1>DragonToken</h1>

<br />

<div class="row">

	<div class="grid col-8 m-2">
		<div align="center">
			<h1>Offers</h1>
		</div>
		<!-- OFFERS -->
		<table class="table table-striped">
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
					<p class="bold">Token Id</p>
					<input type="text" bind:value={offerId} class="form-control" placeholder="Token Id" />
				</div>
				<select class="form-select mb-3" bind:value={_tokenType}>					
					<option value={TokenType.Dragon} selected>Dragon</option>
					<option value={TokenType.Egg}>Egg</option>
				</select>

				<button class="btn btn-dark" on:click={() => contract.getOffer(offerId, _tokenType)}
					>GET OFFER</button
				>
			</tr>

			<tr>
				<h2>Get All Offers</h2>
				
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
				<button  class="btn btn-dark" on:click={() => getOffers()}>GET ALL</button>
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
					<input
						type="text"
						bind:value={removeRentId}
						class="form-control"
						placeholder="Token Id"
					/>
				</div>
				<button class="btn btn-dark" on:click={() => removeRentOffer()}>REMOVE RENT OFFER</button>
			</tr>
		</table>
	</div>
	<div class="grid col-4 m-2">
		<div align="center">
			<h1>Approvals</h1>
		</div>
		<!-- APPROVALS -->
		<table class="table table-striped">
			<tr>
				<h2>Check if Approve for All</h2>
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
				<button class="btn btn-dark" on:click={() => contract.getApproved(singleApproval, true)}
					>Check Approve</button
				>
			</tr>

			<tr>
				<h2>Approve Token</h2>
				<div class="mb-3">
					<input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
				</div>
				<button class="btn btn-dark" on:click={() => contract.approveToken(approveId)}
					>APPROVE</button
				>
			</tr>
			<tr>
				<h2>Revoke Approve for All</h2>
				<button on:click={() => contract.removeApproveForAll()} class="btn btn-danger">
					Remove Approve for all
				</button>
			</tr>
			<tr>
				<h2>Revoke Token</h2>
				<div class="mb-3">
					<input type="text" bind:value={revokeId} class="form-control" placeholder="Token Id" />
				</div>
				<button class="btn btn-danger" on:click={() => contract.revokeToken(revokeId)}
					>REVOKE</button
				>
			</tr>
		</table>
	</div>

	
</div>

<style>
	.btn-danger {
		font-weight: 600;
		letter-spacing: 1px;
	}

	.row {
		width: 100%;
	}

	.grid h1 {
		font-size: 36px;
	}
</style>
