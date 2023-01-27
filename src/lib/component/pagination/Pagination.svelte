<script>

export let perpage
export let pages
export let loadPage
export let inferfaceName
</script>
<div>
    <div class="btn-group mt-2" role="group">
        {#if pages}
            {#each pages as button, i}
                <button
                    on:click={() => loadPage(i * perpage, i * perpage + perpage, inferfaceName)}
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
