<script>
	import { fly } from 'svelte/transition';
	import { dismissTx } from '$lib/storage/alerts';
	import { shortTxHash } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	import { startAwaiter } from '$lib/helpers/web3';

	export let id;
	export const tx_number = 0;
	export let status;
	export let show = true;
	export let txHash;
	export let action;

	let etherScanLink = `<a class="yellowLink" href="https://goerli.etherscan.io/tx/${txHash}" target="_blank">
		${shortTxHash(txHash)}</a>`;

	let alertType = status == 'pending' ? 'info' : 'success';

	function setSuccess() {
		status = 'complete';
		alertType = 'success';
	}

	onMount(async () => {
		await startAwaiter(txHash, setSuccess, 2000);
	});
</script>

{#if show}
	<div id="alertDiv">
		<div
			transition:fly={{ y: 100, duration: 700 }}
			class="alert alert-{alertType} alert-dismissible fade show"
			role="alert"
		>
			<p>
				{#if status == 'complete'}
					Transaction Completed!
					<br />
					<small class="txaction">
						Action : {action}
					</small>
					<br />
					<p>TxId: {@html etherScanLink}</p>
					<i class="fas fa-check-circle completed" />
				{:else}
					Pending transaction...
					<br />
					<small class="txaction">
						Action : {action}
					</small>
					<br />
					<p>TxId: {@html etherScanLink}</p>
					<img class="spinner" src="/images/Spinner.gif" alt="loader" />
				{/if}
			</p>

			<button type="button" class="btn-close" on:click={() => dismissTx(id)}
				><i class="far fa-times-circle" /></button
			>
		</div>
	</div>
{/if}

<style>
	.spinner {
		width: 20px;
		position: absolute;
		bottom: 10px;
		right: 10px;
	}

	.completed {
		color: rgb(117, 228, 117);
		font-size: 16px;
		position: absolute;
		bottom: 10px;
		right: 10px;
	}

	.btn-close {
		color: white !important;
		top: -15px !important;
		right: -5px !important;
	}

	.alert {
		background-image: linear-gradient(0deg, rgb(37, 37, 37) 5%, black 50%);
		opacity: 0.85;
		border: solid 3px rgb(192, 192, 192);
		border-radius: 15px;
		transition: 0.5s;
	}

	.alert:hover {
		transform: scale(1.05);
		opacity: 1;
	}

	.alert p {
		color: rgb(174, 174, 174) !important;
	}

	#alertDiv {
		z-index: 100;				
		width: fit-content;
		margin: auto;
	}

	.alert {
		width: fit-content;
		margin: auto;
	}

	p {
		margin: 0;
	}
</style>
