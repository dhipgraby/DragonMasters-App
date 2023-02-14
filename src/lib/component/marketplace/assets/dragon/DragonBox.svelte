<script>
	import DragonAttributes from '$lib/component/dragon/DragonAttributes.svelte';

	export let img;
	export let element;
	export let dragon;
	export let generation;
	export let _maturity;
	export let owner;
	export let attributes;

	let url = 'dragon/' + dragon.tokenId;
</script>

<div class="card-header">
	<a href={url}>
		<div>
			<img src={img} alt="dragon" />
			<!-- ELEMENT -->
			<div class="pabsolute bottom10 right10">{@html element}</div>
			<!-- GENERATION -->
			<div class="pabsolute top10 left10">
				<span class="badge rounded-pill bg-light text-dark mt-2">
					<b>Gen:{generation}</b>
				</span>
			</div>
			<!-- MATURITY -->
			<div class="pabsolute left10 bottom10 maturity">
				<small><i class="fas fa-seedling" />: {_maturity}</small>
			</div>
		</div></a
	>
</div>

<div class="card-body ta-c">
	<p class="card-title">Dragon : #{dragon.tokenId}</p>
	<div class="priceDiv">
		<span class="badge bg-black"><b>Owner</b>: {@html owner}</span>
	</div>
	<!--   ATTRIBUTES  -->
	<div class="row p-2 mt-0">
		<DragonAttributes {attributes} />
	</div>
</div>

<style>
	.badge b {
		color: rgb(209, 209, 209);
	}
	.card-body {
		padding-bottom: 0px;
	}
</style>
