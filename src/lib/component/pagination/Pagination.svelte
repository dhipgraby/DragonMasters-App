<script>
	export let perpage;
	export let pages;
	export let loadPage;
	export let inferfaceName;

	const calcPage = (page) => {
		let from;
        let to;
		if (page === 0) {
			from = page * perpage;
			to = page * perpage + perpage;
		} else {
			from = page * perpage + 1;
			to = page * perpage + (perpage + 1);
		}
        console.log(from,to)
		return [from, to];
	};
</script>

<div>
	<div class="btn-group mt-2" role="group">
		{#if pages}
			{#each pages as button, i}
				<button
					on:click={() => loadPage(calcPage(i)[0], calcPage(i)[1], inferfaceName)}
					type="button"
					class="btn btn-light">{i}</button
				>				
			{/each}
		{/if}
	</div>
</div>

<style>
	.btn-light {
		font-weight: 700;
		color: grey;
	}

	.btn-light:hover {
		color: black;
	}
</style>
