<script>
	import { TokenType } from '$lib/contracts/Marketplace';
	export let contract;

	let approveId, singleApproval, revokeId, tokenType;
</script>

<div class="mb-4">
	<h1>Approvals - Marketplace 'operator rights' on tokens</h1>
</div>
<br>

<div class="row">
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Approve Single Token</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
			</div>	
			<button class="btn btn-dark" on:click={() => contract.approveToken(approveId, tokenType)}
				>APPROVE</button
			>
		</div>

		<div class="grid">
			<h2>Approve for All Tokens</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button class="btn btn-dark" on:click={() => contract.approveForAll(tokenType)}
				>APPROVE ALL</button
			>
		</div>
	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Check Approval for Single Token</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
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
				on:click={() => contract.getApproved(singleApproval, tokenType, true)}
				>Check Approve</button
			>
		</div>

		<div class="grid">
			<h2>Check Approval for All Tokens</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button
				class="btn btn-dark"
				on:click={() => contract.isApprovedForAll(tokenType, true)}>Check Approve for All</button
			>
		</div>

	</div>
	<div class="col-sm-12 col-md-12 col-xl-4">
		<div class="grid">
			<h2>Revoke Approval for Single Token</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<div class="mb-3">
				<input type="text" bind:value={revokeId} class="form-control" placeholder="Token Id" />
			</div>
			<button class="btn btn-danger" on:click={() => contract.revokeToken(revokeId, tokenType)}
				>REVOKE</button
			>
		</div>
		<div class="grid">
			<h2>Revoke Approval for All Tokens</h2>
			<p class="bold">Token Type</p>
			<select class="form-select mb-3" bind:value={tokenType}>
				<option value={TokenType.Egg} selected>Egg</option>
				<option value={TokenType.Dragon}>Dragon</option>
			</select>
			<button on:click={() => contract.removeApproveForAll(tokenType)} class="btn btn-danger">
				Remove Approve for all
			</button>
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
