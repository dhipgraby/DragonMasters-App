<script>
    import { ScreenType } from "$lib/helpers/uriHelper";

	export let title;
	export let changeView;
	export let totalEggs;
	export let totalDragons;
    export let _lendType;

    let eggsView = (_lendType === ScreenType.lends) ? 'eggsLend': 'eggsBorrow';
    let dragonsView = (_lendType === ScreenType.lends) ? 'dragonsLend': 'dragonsBorrow';

</script>

<h1>{title}</h1>
<p>Total Eggs: {totalEggs} <span class="spacer" />Total Dragons: {totalDragons}</p>
<div class="row">
	<div class="col loanbox shadow" on:click={() => changeView(eggsView)}>
		<p>Eggs</p>
	</div>
	<div class="col loanbox shadow" on:click={() => changeView(dragonsView)}>
		<p>Dragons</p>
	</div>
</div>

<style>
	.row {
		max-width: 500px;
		margin: auto;
	}
</style>
