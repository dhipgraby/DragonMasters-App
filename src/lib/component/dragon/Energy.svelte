<script>
	import ProgressBar from './ProgressBar.svelte';
	export let fullEnergy;
	export let energy;
</script>

<p class="card-text">
	<b>Energy</b>
	<br />
	<ProgressBar
		emitEvent={true}
		eventName={'isReady'}
		on:isReady={fullEnergy}
		timer={energy}
		bgClass={'bg-warning'}
	/>
</p>
