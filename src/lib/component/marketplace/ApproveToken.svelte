<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let tokenId;
	export let contract;
	export let _tokenType;

	async function singleApprove() {
		let approval = await contract.approveToken(tokenId, _tokenType);
		console.log(approval);
		if (approval.blockHash) {
			dispatch('approved', {
				text: 'Address approved'
			});
		}
	}

	async function approveForAll() {
		let approval = await contract.approveForAll(_tokenType);
		console.log(approval);
		if (approval.blockHash) {
			dispatch('approved', {
				text: 'Address approved'
			});
		}
	}
</script>

<div align="center">
	<h4>Marketplace Approval <br /> <span class="badge bg-dark">Token ID: #{tokenId}</span></h4>
	<p>Approve the marketplace to sell your NFTs</p>
	<div class="alert alert-primary" role="alert">
		<p>Approve marketplace <b>only for this token</b> or <b>all your tokens</b></p>
	</div>
	<button
		class="btn btn-danger text-light"
		data-bs-dismiss="modal"
		on:click={async () => {
			await singleApprove();
		}}>Approve single token</button
	>
	<button
		class="btn btn-danger text-light"
		data-bs-dismiss="modal"
		on:click={async () => {
			await approveForAll();
		}}>Approve for All</button
	>
</div>

<style>

	.alert {
		padding: 0px 25px;
		width: fit-content;
	}

	button {
		border-radius: 8px;
		margin-left: 10px;
	}

	p {
		margin: 10px;
	}

	.badge {
		margin-top: 12px;
		padding: 2px 15px;
		font-size: 14px;
	}
</style>
