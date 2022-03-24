<script>
	import { readable } from 'svelte/store';
	import Message from '../Message.svelte';

	export let egg;
	export let contract;

	let incTime = Number(egg.incubationTime);

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

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<a href="/egg/{egg.tokenId}"> <div id="egg" /></a>
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

		{#if egg.incubationTime == undefined}
			<button class="btn btn-dark" on:click={() => contract.startIncubation(egg.tokenId)}
				>Start Incubation</button
			>
		{:else if $time == 0}
			<button class="btn btn-yellow" on:click={() => contract.hatch(egg.tokenId)}
				>Ready to Hatch!</button
			>
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
</style>
