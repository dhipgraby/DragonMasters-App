<script>
	import { readable } from 'svelte/store';
	export let egg;

	let incTime = Number(egg.incubationTime);

	if(incTime > 40) incTime -= 30
	let incubating = incTime > 0 ? true : false;

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

<div class="col-md-4">
	
	<div class="card" style="width: 18rem;">
		<div class="card-header">
			<div id="egg" />
		</div>
		<div class="card-body">
			<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			<hr />
			<p class="card-text">
				<b>MumId:</b>
				{egg.mumId}
				<br />
				<b>DadId:</b>
				{egg.dadId}
			</p>

			{#if $time < 0}
				<button class="btn btn-dark">Start Incubation</button>
			{:else if $time == 0}
				<button class="btn btn-yellow">Ready to Hatch!</button>
			{:else}
				{#if incubating}
					<div class="basicMsg">
						<span>
							{$time}
						</span>
						<small>time let for hatching...</small>
					</div>
				{/if}

				<button class="btn btn-yellow" disabled={incubating}>Ready to Hatch!</button>
			{/if}

			
		</div>
	</div>
</div>

<style>
	.basicMsg {
		box-shadow: 2px 2px 5px 0px #b6b6b6;
		width: fit-content;
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		bottom: 0px;
		padding: 2px 18px;
		background-color: #f2fffb;
		border-radius: 50px;
		border: solid 1px #c5fae9;
		font-size: 14px;
		letter-spacing: 1px;
		font-weight: 600;
		z-index: 2;
	}

	.basicMsg span {
		font-weight: 700;
	}

	button {
		padding: 8px 24px;
		border-radius: 50px;
		transition: 0.1s;
	}

	button:hover {
		transform: scale(1.02);
		opacity: 0.8;
	}

	.btn-yellow {
		background-color: #ffed4a;
		box-shadow: 0px 5px 10px -8px;
		font-weight: 600;
		letter-spacing: 1px;
	}

	.btn-yellow:disabled {
		opacity: 0.4;
	}

	p {
		font-weight: 600;
		color: #999999;
	}
	.card {
		border-radius: 20px;
		margin: 10px;
		transition: 0.5s;
	}

	.card:hover {
		box-shadow: 0px 10px 20px -8px;
	}

	.card-title {
		color: #737373;
		font-size: 20px;
		font-weight: 600;
	}

	.card-header {
		border-radius: 20px 20px 0px 0px;
		cursor: pointer;
		padding: 20px 0px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	.card-header:hover #egg {
		transform: scale(1) rotateX(0deg);
		box-shadow: 0px 25px 15px -5px #595959;
	}

	.card-body {
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
	#egg {
		transform: scale(0.55) rotateX(30deg);
		margin: auto;
		display: block;
		width: 132px;
		height: 174px;
		background-color: #d8d8d8;
		background: linear-gradient(229deg, #246655, #9e3a3a, #e0e0e0, #3391ee);
		background-size: 800% 800%;
		-webkit-border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
		box-shadow: 0px 15px 24px -10px #595959;
		-webkit-animation: AnimationName 18s ease infinite;
		-moz-animation: AnimationName 18s ease infinite;
		animation: AnimationName 12s ease infinite;
		transition: 0.5s;
	}

	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
</style>
