<script>
	import { TokenType } from '$lib/contracts/Marketplace';
	export let contract;

	let approveId, singleApproval, revokeId, _tokenType;
</script>

<div class="mb-4">
	<h1>Approvals</h1>
</div>

<button
	class="btn btn-info t-sm text-light bold text-sa mb-3"
	on:click={() => contract.isApprovedForAll(_tokenType, true)}>Check Approve for All</button
>
<br>
<div class="tokencontainer">
	<b>Token Type</b>
	<select class="form-select mb-3" bind:value={_tokenType}>
		<option value={TokenType.Dragon} selected>Dragon</option>
		<option value={TokenType.Egg}>Egg</option>
	</select>
	
</div>

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Approve Token</h2>
			<div class="mb-3">
				<input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
			</div>	
			<button class="btn btn-dark" on:click={() => contract.approveToken(approveId, _tokenType)}
				>APPROVE</button
			>
		</div>

		<div class="grid">
			<h2>Approve for All</h2>
			<button class="btn btn-dark" on:click={() => contract.approveForAll(_tokenType)}
				>APPROVE ALL</button
			>
		</div>
	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Check Single Approval</h2>
			<div class="mb-3">
				<input
					type="text"
					bind:value={singleApproval}
					class="form-control"
					placeholder="Token Id"
				/>
			</div>
			<button
				class="btn btn-dark"
				on:click={() => contract.getApproved(singleApproval, _tokenType, true)}
				>Check Approve</button
			>
		</div>
	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Revoke Approve for All</h2>
			<button on:click={() => contract.removeApproveForAll(_tokenType)} class="btn btn-danger">
				Remove Approve for all
			</button>
		</div>

		<div class="grid">
			<h2>Revoke Token</h2>
			<div class="mb-3">
				<input type="text" bind:value={revokeId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-danger" on:click={() => contract.revokeToken(revokeId, _tokenType)}
				>REVOKE</button
			>
		</div>
	</div>
</div>

<style>
	.tokencontainer {
		max-width: 200px;	
	}
	.btn-danger {
		font-weight: 600;
		letter-spacing: 1px;
	}

	.grid {
		margin-bottom: 20px;
	}
</style>
