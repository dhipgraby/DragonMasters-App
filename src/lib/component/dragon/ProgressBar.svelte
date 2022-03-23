<script>
    import { readable } from 'svelte/store';

    export let bgClass = 'bg-info'	
    export let timer 
	let percentTimer = timer
    
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

	const timeLeft = readable(timer, function start(set) {
		const minterval = setInterval(() => {
			if (timer > 0) {
				timer--;
				set(timer);
			} else {
				stop();
			}
		}, 1000);

		return function stop() {
			clearInterval(minterval);
		};
	});
</script>

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



<style>
	.timeleft {
		color: black;
		font-size: 16px;
		margin: 10px 0px;
	}

	.progress {
		background-color: #d0e0ff;
		border-radius: 50px;
	}
</style>