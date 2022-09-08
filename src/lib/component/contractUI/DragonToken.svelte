<script>
	export let contract;

	let getDragonId;
	let relatedA;
	let relatedB;
</script>

<h1>DragonToken</h1>

<button class="btn btn-info text-light bold mb-3 mt-3" on:click={() => contract.totalSupply()}
	>Total Supply</button
>

<div class="row">
	<div class="col-sm-4">
		<div class="grid" align="left">
			<h2>Get Dragon</h2>
			<div class="mb-3">
				<input type="text" bind:value={getDragonId} class="form-control" placeholder="Dragon Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getDragon(getDragonId)}>GET</button>
		</div>
	</div>

	<div class="col-sm-4">
		<div class="grid" align="left">
			<h2>Get Relationship</h2>
			<div class="mb-3">
				<input
					type="text"
					bind:value={relatedA}
					class="form-control mb-3"
					placeholder="Dragon Id"
				/>
				<input type="text" bind:value={relatedB} class="form-control" placeholder="Dragon Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.getRelationship(relatedA, relatedB)}
				>GET</button
			>
		</div>
	</div>
</div>
