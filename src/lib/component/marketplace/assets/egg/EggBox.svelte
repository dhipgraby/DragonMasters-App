<script>
	export let eggImg;
	export let element;
	export let tokenId;
	export let owner;

	let url = 'egg/' + tokenId;
</script>

<div class="card-header">
	<a href={url}>
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
		<div class="col m-0 ta-c">
			<h5 class="card-title">Egg : #{tokenId}</h5>
		</div>

		<div class="ta-l">
			<span class="badge bg-black"><b>Owner</b>: {@html owner}</span>
		</div>
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
