<script>
	import { readable } from 'svelte/store';
	import Message from '../Message.svelte';

	export let egg;
    export let contract;

	const hatch = () => contract.egg.hatch(egg.tokenId);
	const startIncubation = () => contract.egg.startIncubation(egg.tokenId);

	$: incTime = Number(egg.incubationTime);
	$: incubating = incTime > 0 ? true : false;

	export const time = readable(incTime, function start(set) {
		const interval = setInterval(() => {
			if (incTime > 0) {
				incTime--;
				set(incTime);
			} else {
				incubating = false;
				stop();
			}
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	});
</script>

<div class="attrDiv">
	<h3><i class="fas fa-fist-raised" aria-hidden="true"></i> Actions</h3>
	<hr />
	{#if egg.incubationTime == undefined}
		<button class="btn btn-dark" on:click={() => startIncubation()}>Start Incubation</button>
	{:else if $time == 0}
		<button class="btn btn-yellow shadow-md" on:click={() => hatch()}>Ready to Hatch!</button>
	{:else}
		{#if incubating}
			<Message>
				<span>
					{$time}
				</span>
				<small>time let for hatching...</small>
			</Message>
		{/if}
		<button
			class="btn btn-yellow"
			disabled={incubating}
			on:click={() => {
				if (!incubating) hatch();
			}}>Ready to Hatch!</button
		>
	{/if}
</div>
