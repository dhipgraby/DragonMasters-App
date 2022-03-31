<script>
	import { createEventDispatcher } from 'svelte';
	import { readable } from 'svelte/store';
	
	export let bgClass = 'bg-info';
	export let timer;
	export let emitEvent = false;
	export let eventName;

	const dispatch = createEventDispatcher();

	let percentTimer = timer;
	let secondsLeft = timer;

	let secondsUp = 0;

	const percent = readable(percentTimer, function start(set) {
		const interval = setInterval(() => {
			if (secondsUp < percentTimer) {
				secondsUp++;
				let percentage = (secondsUp * 100) / percentTimer;

				set(percentage);
			} else {
				stop();
			}
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	});

	const timeLeft = readable(secondsLeft, function start(set) {
		const minterval = setInterval(() => {
			if (secondsLeft > 0) {
				secondsLeft--;
				set(secondsLeft);
			} else {
				stop();
			}
		}, 1000);

		return function stop() {
			clearInterval(minterval);
		};
	});

	$: send = $timeLeft == 0 ? sendEvent() : '';

	function sendEvent() {
		if (emitEvent) {
			dispatch(eventName);
		}
		return
	}
</script>

{#if $timeLeft > 0}
	<p class="timeleft">Time left: {$timeLeft} seconds</p>
	<div class="progress">
		<div
			class="progress-bar progress-bar-striped progress-bar-animated {bgClass}"
			role="progressbar"
			style="width: {$percent}%"
			aria-valuemin="0"
			aria-valuemax={100}
		>
			{parseFloat($percent).toFixed(2)}%
		</div>
	</div>

{/if}

<style>

	.progress {
		margin: 5px 0px;
	}

	.progress-bar {
		color: black;
		font-size: 11px !important;		
		display: inline-block;

	}

	.timeleft {
		color: black;
		font-size: 12px;
		margin: 10px 0px;
	}

	.progress {
		background-color: #d0e0ff;
		border-radius: 50px;
	}
</style>
