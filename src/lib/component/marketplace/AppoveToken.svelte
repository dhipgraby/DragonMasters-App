<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let tokenId;
	export let contract;
	export let _tokenType;

	async function singleApprove() {
		let approval = await contract.approveToken(tokenId,_tokenType);
		console.log(approval);
		if (approval.blockHash) {
			dispatch('approved', {
				text: 'Address approved'
			});
		}
	}

	async function approveForAll() {
		let approval = await contract.approveForAll(_tokenType);
		console.log(approval)
		if (approval.blockHash) {
			dispatch('approved', {
				text: 'Address approved'
			});
		}
	}
</script>

<div align="center">
	<h3>Token ID: {tokenId}</h3>
	<h6>Approve the marketplace to sell your NFTs</h6>
	<p><small>Approve marketplace for only this token</small></p>
	<button
		class="btn btn-danger text-light"
		data-bs-dismiss="modal"
		on:click={async () => {
			await singleApprove();
		}}>Approve single token</button
	>
	<br />
	<p><small> Approve marketplace for your tokens</small></p>
	<button
		class="btn btn-danger text-light"
		data-bs-dismiss="modal"
		on:click={async () => {
			await approveForAll();
		}}>Approve for All</button
	>
</div>
