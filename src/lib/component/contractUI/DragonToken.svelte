<script>
	export let contract;

	let getDragonId;	
	let relatedA;
	let relatedB;

</script>

<h1>DragonToken</h1>

<br />
<div class="grid" align="left">
	<button class="btn btn-info t-sm" on:click={() => contract.totalSupply()}>Total Supply</button>

	<br />
	<table class="table table-striped">
		<tr>
			<h2>Get Dragon</h2>
			<div class="mb-3">
				<input type="text" bind:value={getDragonId} class="form-control" placeholder="Dragon Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getDragon(getDragonId)}>GET</button>
		</tr>
		<tr>
			<h2>Get Relationship</h2>
			<div class="mb-3">
				<input type="text" bind:value={relatedA} class="form-control" placeholder="Dragon Id" />
				<input type="text" bind:value={relatedB} class="form-control" placeholder="Dragon Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getRelationship(relatedA,relatedB)}>GET</button>
		</tr>
	</table>
</div>
