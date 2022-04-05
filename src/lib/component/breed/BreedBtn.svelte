<script>
    export let breed;
    export let mum_dragon;
    export let dad_dragon;
</script>

<div class="col-sm-12">
    {#if mum_dragon.tokenId && dad_dragon.tokenId}
        <button
            class="btn btn-warning btn-yellow text-dark"
            on:click={() => {
                breed(mum_dragon.tokenId, dad_dragon.tokenId);
            }}
            >breed
        </button>
    {/if}
</div>
