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

	let dna;
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);

	$: maturity = Object.keys(Maturity)[dragon.ageGroup];

	onMount(async () => {
		dna = await contract.getDna(dragon.dnaId);
	});
</script>

<div class="row pt-5">
	<div class="col-4">
		<!-- IMG -->
		<div class="dragonBg">
			<img src={img} alt="dragon" />
			<div class="pabsolute bottom10 right10">{@html element}</div>
		</div>
		<About {dragon} {dna} maturity={maturity} />
	</div>

	<!-- RIGHT-SIDE ->ATTRIBUTES AND RAISE -->
	<div class="col-8">
		<div class="attrDiv">
			<h3>Create Offer</h3>

		</div>
		<DragonAttributes attributes={dragon.attributes} />
		<RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
	</div>
</div>
