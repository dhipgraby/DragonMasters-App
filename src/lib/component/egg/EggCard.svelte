<script>
	import { readable } from 'svelte/store';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { afterUpdate } from 'svelte';
	import { TokenType } from '$lib/contracts/Marketplace';
	import Message from '../Message.svelte';
	import CircleMenu from '../marketplace/CircleMenu.svelte';
	import { loadOwner } from '$lib/helpers/utils';
	import '$lib/css/marketplace/egg.css';
	import RentalTerms from '../marketplace/RentalTerms.svelte';

	export let egg;
	export let displayOwner;
	export let settingsMenu = false;
	export let showRentDetails;
	export let acctionBtn = true;
	export let contract;

	let account = contract?.contract?.account;
	let eggImg;
	let element;
	let hovering;

	$: incTime = Number(egg.incubationTime);
	$: incubating = incTime > 0 ? true : false;

	const hatch = () => contract.hatch(egg.tokenId);
	const startIncubation = () => contract.startIncubation(egg.tokenId);
	const enter = () => (hovering = true);
	const leave = () => (hovering = false);

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

	afterUpdate(async () => {
		element = iconElement(egg.subSpecies);
		eggImg = await getImg(egg.subSpecies).egg;
	});
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="card">
	<div class="card-header">
		{#if settingsMenu}
			<CircleMenu _tokenType={TokenType.Egg} tokenProps={egg} {hovering} />
		{/if}
		<a href="/egg/{egg.tokenId}">
			<div class="egg-top-container">
				{#if eggImg}
					<img class="eggImg egg-top" alt="egg" src={eggImg} />
					<div class="egg-top-shadow" />
				{/if}

				<div class="pabsolute top10 left10">{@html element}</div>
			</div>
		</a>
	</div>
	<div class="card-body">
		<div class="row w-100 mb-2">
			<div class="col m-0 ta-l">
				<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			</div>
			{#if displayOwner}
				<div class="ta-l">
					<span class="badge bg-black"><b>Owner</b>: {@html loadOwner(account, egg.owner)}</span>
				</div>
			{/if}

			{#if egg?.offer?.sellOffer}
				<!-- FOR SALE -->
				<div class="col-3">
					<span class="badge bg-danger">For Sell</span>
				</div>
			{/if}
			{#if egg?.offer?.rentOffer}
				<!-- FOR RENT -->
				<div class="col-3">
					<span class="badge bg-dark">For Rent</span>
				</div>
			{/if}
		</div>
		{#if acctionBtn}
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
		{/if}
	</div>
</div>

{#if showRentDetails}
	<RentalTerms tokenId={egg.tokenId} details={egg.details} />
{/if}

<style>
	.card-body {
		padding-bottom: 8px;
	}

	.btn-dark,
	.btn-yellow {
		border-radius: 20px;
		width: 100%;
		margin-top: 10px;
	}

	.btn-yellow:hover {
		border: solid 1px rgb(255, 166, 33);
	}
</style>
