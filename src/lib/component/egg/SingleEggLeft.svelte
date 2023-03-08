<script>	
	import '$lib/css/marketplace/egg.css';

    export let img;
    export let element;

</script>

<div class="col-6 leftsideBox">
	<!-- IMG -->
	<div class="eggBg">
		<img src={img} alt="dragon" />
		<div class="pabsolute bottom10 right10">{@html element}</div>
	</div>
</div>

<style>
	.leftsideBox {
		padding: 10px 10px;
	}
</style>
