<script>
	import NavBar from '$lib/component/NavBar.svelte';
	import Alert from '$lib/component/AlertMsg.svelte';
	import TxAwaiter from '$lib/component/TxAwaiter.svelte';
	import { alertTrigger, txTrigger } from '$lib/storage/alerts';

	export let uriPath;
	
	$: lastAlerts = $alertTrigger 
	$: pendingTransactions = $txTrigger

</script>

<NavBar {uriPath} />

{#each lastAlerts as alert, i}
	<Alert {...alert} alert_number={i} />
{/each}

{#each pendingTransactions as transaction, i}
	<TxAwaiter {...transaction} tx_number={i} />
{/each}
