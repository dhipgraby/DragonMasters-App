<script>
	import { onMount } from 'svelte';
    import { getEth } from '$lib/helpers/utils';
    import BasicModal from '$lib/component/BasicModal.svelte';
	

    export let tokenId;
    export let details;

	let openModal;
	let modaComponent;
    let duration;
    let timeLap;
    let deposit;    
    
	onMount(async () => {		
		timeLap = 'hours';
		duration = Number(details.terms.minDuration) / 60 / 60;
		if (duration > 24) {
			duration = duration / 24;
			timeLap = duration > 1 ? 'days' : 'day';
		}

		deposit = await getEth(details.terms.deposit);
		openModal = function () {
			modaComponent.openModal();
		};
	});
</script>

<BasicModal bind:this={modaComponent} btnName={'Rental Terms'} id={'tokenModal' + tokenId}>
	<div class="ta-l">
		<h2 class="mb-3 under">Rental Terms</h2>
		<hr />
		<p><b>Duration</b>: {duration} {timeLap}</p>
		<p><b>Deposit</b>: {deposit} <i class="fab fa-ethereum" /></p>
		<hr />
		<p><b>Lender</b>: {details.lender}</p>
		<p><b>Borrower</b>: {details.borrower}</p>
	</div>
</BasicModal>
