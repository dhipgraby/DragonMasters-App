<script>
	export let forSale;
	export let forRent;
</script>

<h4>Manage Offers</h4>
<p>Select Offert type:</p>

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
</style>
