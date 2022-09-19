<script>
	export let contract;

	let approveId, singleApproval, revokeId;
</script>

<div class="mb-4">
	<h1>Approvals</h1>
</div>

<button
	class="btn btn-info t-sm text-light bold text-sa mb-3"
	on:click={() => contract.isApprovedForAll(true)}>Check Approve for All</button
>

<div class="row">
	<div class="col-sm-4">
		<div class="grid">
			<h2>Approve Token</h2>
			<div class="mb-3">
				<input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-dark" on:click={() => contract.approveToken(approveId)}>APPROVE</button
			>
		</div>

		<div class="grid">
			<h2>Approve for All</h2>
			<button class="btn btn-dark" on:click={() => contract.approveForAll()}>APPROVE ALL</button>
		</div>
    </div>
		<div class="col-sm-4">
			<div class="grid">
				<h2>Check Single Dragon Approval</h2>
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
			</div>
		</div>

		<div class="col-sm-4">
			<div class="grid">
				<h2>Revoke Approve for All</h2>
				<button on:click={() => contract.removeApproveForAll()} class="btn btn-danger">
					Remove Approve for all
				</button>
			</div>

			<div class="grid">
				<h2>Revoke Token</h2>
				<div class="mb-3">
					<input type="text" bind:value={revokeId} class="form-control" placeholder="Token Id" />
				</div>
				<button class="btn btn-danger" on:click={() => contract.revokeToken(revokeId)}
					>REVOKE</button
				>
			</div>
		</div>
	</div>

<style>
	.btn-danger {
		font-weight: 600;
		letter-spacing: 1px;
	}

	.grid {
		margin-bottom: 20px;
	}
</style>
