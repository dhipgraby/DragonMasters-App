<script>
	import { fly } from 'svelte/transition';
	import { dismissTx } from '$lib/storage/alerts';
	import { shortTxHash } from '$lib/helpers/utils';
	import { onMount } from 'svelte';
	import { startAwaiter } from '$lib/helpers/web3';

	export let id;
	export let tx_number = 0;
	export let status;
	export let show = true;
	export let txHash;
	export let action;

	let etherScanLink = `<a class="yellowLink" href="https://goerli.etherscan.io/tx/${txHash}" target="_blank">${shortTxHash(
		txHash
	)}</a>`;
	let alertType = status == 'pending' ? 'info' : 'success';
	$: message =
		status == 'pending'
			? `Pending Transaction 
			<br>
			<small class='txaction'>Action: ${action}</small>
			<br>TxId: ${etherScanLink}`
			: `Transaction Complented! 
			<br>
			<small class='txaction'>Action: ${action}</small>
			<br>TxId: ${etherScanLink}`;

	$: content = message;

	let marginTop = tx_number * 70 + 100;

	if (marginTop < 110) marginTop = 80;

	function setSuccess() {
		status = 'complete';
		content = message;
		alertType = 'success';
	}

	onMount(async () => {
		await startAwaiter(txHash, setSuccess, 2000);
	});
</script>

{#if show}
	<div id="alertDiv" style="top:{marginTop}px;">
		<div
			transition:fly={{ y: 100, duration: 700 }}
			class="alert alert-{alertType} alert-dismissible fade show"
			role="alert"
		>
			<p>
				{#if alertType == 'success'}
					{@html content}
					<i class="fas fa-check-circle completed" />
				{:else}
					{@html content}
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
		background-image: linear-gradient(0deg, rgb(46, 46, 46) 5%, black 30%);
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
		position: fixed;
		right: 25px;
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
