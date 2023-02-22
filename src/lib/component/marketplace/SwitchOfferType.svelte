<script>
	export let forSale;
	export let forRent;
</script>

<h3>Select Offer Type</h3>

<div class="row selectRow">
	<div class="col m-3">
		<div class="selectDiv" on:click={() => forSale()}>
			<p class="greyText">
				<i class="fas fa-coins" />
				<br />
				For Sale
			</p>
		</div>
	</div>

	<div class="col m-3">
		<div class="selectDiv" on:click={() => forRent()}>
			<p class="greyText">
				<i class="fas fa-university" />
				<br />
				For Rent
			</p>
		</div>
	</div>
</div>

<style>
	.greyText {
		font-weight: 500;
		white-space: nowrap;
		margin: 0px;
		color: grey;
	}

	.selectDiv {
		border: solid 1px grey;
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
</style>
