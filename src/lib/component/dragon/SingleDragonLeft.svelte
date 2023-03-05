<script>
	import About from './About.svelte';
	import DragonAttributes from './DragonAttributes.svelte';

	export let img;
	export let element;
	export let dragon;
	export let dna;
	export let maturity;
</script>

<div class="col-6 leftsideBox">
	<!-- IMG -->
	<div class="dragonBg">
		<img src={img} alt="dragon" />
		<div class="pabsolute bottom10 right10">{@html element}</div>
	</div>
	<About {dragon} {dna} {maturity} />
	<!-- ATTRIBUTES -->
	<div class="attrDiv">
		<h3>Attributes</h3>
		<hr />
		<DragonAttributes attributes={dragon.attributes} />
	</div>
</div>

<style>
	.leftsideBox {
		padding: 10px 10px;
	}
</style>
