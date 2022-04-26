<script>
	import { readable } from 'svelte/store';
	import Message from '../Message.svelte';
	import { getImg } from '$lib/storage/dragonImg';
import { onMount } from 'svelte';

	export let egg;
	export let contract;
	
	let eggImg

	$: incTime = Number(egg.incubationTime);

	$: incubating = incTime > 0 ? true : false;

	
	onMount(()=>{
		eggImg = getImg(egg.subSpecies).egg;
	})

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

	function hatch() {
		contract.hatch(egg.tokenId);
	}

	function startIncubation() {
		contract.startIncubation(egg.tokenId);
	}
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<a href="/egg/{egg.tokenId}">
			<div class="egg-top-container">
				{#if eggImg}
				<img class="eggImg egg-top" alt="egg" src={eggImg} />
				<div class="egg-top-shadow" />
				{/if}
				
			</div>
		</a>
	</div>
	<div class="card-body">
		<h5 class="card-title">Egg : #{egg.tokenId}</h5>
		<hr />

		{#if egg.incubationTime == undefined}
			<button class="btn btn-dark" on:click={() => startIncubation()}>Start Incubation</button>
		{:else if $time == 0}
			<button class="btn btn-yellow" on:click={() => hatch()}>Ready to Hatch!</button>
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
					if (!incubating) contract.hatch(egg.tokenId);
				}}>Ready to Hatch!</button
			>
		{/if}

		<a href="/egg/{egg.tokenId}"
			><button class="btn btn-light">Checkout <i class="fas fa-arrow-circle-right" /></button></a
		>
	</div>
</div>

<style>
	.eggImg {
		width: 170px;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	.btn-dark {
		font-size: 14px;
		padding: 4px 20px !important;
		margin-bottom: 10px;
	}

	.btn-light {
		width: 100%;
		padding: 4px 20px !important;
		margin-bottom: 10px;
		font-weight: 500;
		border: solid 1px;
	}

	.btn-light:hover {
		background-color: black;
		color: white;
	}

	.btn-yellow {
		font-size: 14px;
		padding: 4px 20px !important;
		margin-bottom: 10px;
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

	.card-body {
		text-align: center;
	}

	.egg-top-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Animate the things */
	.egg-top {
		animation-name: egg-top;
		animation-duration: 4s;
		animation-iteration-count: infinite;
	}

	.egg-top-shadow {
		animation-name: egg-top-shadow;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		background-color: #222;
		width: 100px;
		height: 50px;
		margin-left: auto;
		margin-right: auto;
		border-radius: 100px / 50px;
	}

	@keyframes egg-top {
		0% {
			transform: translate(0, 0);
		}
		35% {
			transform: translate(0, -12px);
			animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
		}
		100% {
			transform: translate(0, 0);
			animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
		}
	}

	@keyframes egg-top-shadow {
		0% {
			filter: blur(10px);
			opacity: 0.25;
		}
		35% {
			filter: blur(15px);
			opacity: 0.15;
			transform: scale(1.3);
		}
		100% {
			filter: blur(10px);
			opacity: 0.25;
		}
	}
</style>
