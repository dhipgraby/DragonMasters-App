<script>
	export let forSale;
	export let forRent;
	export let tokenId;
</script>

<h4>Manage Offers</h4>
<span class="badge bg-dark">token # {tokenId}</span>
<small>Select Offert type:</small>

<div class="row selectRow">
	<div class="col m-3">
		<div class="selectDiv dtable" on:click={() => forSale()}>
			<div class="dtableInner">
				<p class="greyText">
					<i class="fas fa-coins" />
					<br />
					Sell
				</p>
			</div>
		</div>
	</div>

	<div class="col m-3">
		<div class="selectDiv dtable" on:click={() => forRent()}>
			<div class="dtableInner">
				<p class="greyText">
					<i class="fas fa-university" />
					<br />
					Rent
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.row {
		max-width: 400px;
		margin: auto;
	}

	.selectRow {
		text-align: -webkit-center;
	}

	.greyText {
		font-weight: 500;
		white-space: nowrap;
		margin: 0px;
		color: grey;
	}

	.selectDiv {
		max-width: 120px;
		min-width: 100px;
		min-height: 92px;
		cursor: pointer;
		border: solid 2px rgb(172, 172, 172);
		border-radius: 10px;
		padding: 20px;
		text-align: center;
	}

	.selectDiv:hover {
		border-color: black;
	}

	.selectDiv:hover .greyText {
		color: black;
	}

	p {
		font-weight: 600;
	}

	small {
		margin-top: 10px;
		display: block;
	}
</style>
