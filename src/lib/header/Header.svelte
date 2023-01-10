<script>
	import NavBar from '$lib/component/NavBar.svelte';
	import Alert from '$lib/component/AlertMsg.svelte';
	import TxAwaiter from '$lib/component/TxAwaiter.svelte';
	import { alertTrigger, txTrigger } from '$lib/storage/alerts';
	import { contracts } from '$lib/contracts/contracts';	
	import { onMount } from 'svelte';

	let contractData;
	let user_address;

	onMount(async ()=>{
	contractData = await contracts()
	user_address = await contractData.account	
	})

	export let uriPath;

	$: lastAlerts = $alertTrigger;
	$: pendingTransactions = $txTrigger;
</script>

<NavBar {uriPath} {user_address} />

{#each lastAlerts as alert, i}
	<Alert {...alert} alert_number={i} />
{/each}

{#if pendingTransactions.length > 0}
	<ul class="txList">
		{#each pendingTransactions as transaction, i}
			<li>
				<TxAwaiter {...transaction} tx_number={i} />
			</li>
		{/each}
	</ul>
{/if}
