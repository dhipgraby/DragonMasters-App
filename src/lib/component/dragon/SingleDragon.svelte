<script>
	import '/static/css/Assets/SingleAsset.css';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { Maturity } from '$lib/helpers/utils.js';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import DragonAttributes from './DragonAttributes.svelte';
	import RaiseAndEnergy from './RaiseAndEnergy.svelte';
	import About from './About.svelte';

	const dispatch = createEventDispatcher();

	export let dragon;
	export let contract;
	export let isOwner = false;
	export let isForSale;
	export let isForRent;

	let dna;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		dna = await contract.getDna(dragon.dnaId);
	});
</script>

<div class="row pt-5">
	<div class="col-6 leftsideBox">
		<!-- IMG -->
		<div class="dragonBg">
			<img src={img} alt="dragon" />
			<div class="pabsolute bottom10 right10">{@html element}</div>
		</div>
		<About {dragon} {dna} {maturity} />

		<div class="attrDiv">
			<h3>Attributes</h3>
			<hr />
			<DragonAttributes attributes={dragon.attributes} />
		</div>
	</div>
	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-6 rightsideBox">
		{#if isOwner}
			<div class="attrDiv">
				<h3>Create Offer</h3>
			</div>
			<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
		{/if}
		{#if isForSale}
			<div class="attrDiv">
				<h3>Sale interface</h3>
				<hr />
			</div>
		{/if}
		{#if isForRent}
			<div class="attrDiv">
				<h3>Rent interface</h3>
				<hr />
			</div>
		{/if}
	</div>
</div>

<style>
	.leftsideBox,
	.rightsideBox {
		padding: 10px 10px;
	}
</style>
