<script>
	import NavBar from '$lib/component/NavBar.svelte';
	import Alert from '$lib/component/AlertMsg.svelte';
	import { alertTrigger } from '$lib/storage/alerts';

	let lastAlerts;

	const unsubscribe = alertTrigger.subscribe((alerts) => {
		lastAlerts = alerts;
	});
</script>

<NavBar />

{#each lastAlerts as alert, i}
	<Alert {...alert} alert_number={i} />
{/each}

<style>
</style>
