<script>
    export let dragon;
</script>
<div class="row w-100">
    <div class="col m-0 ta-l">
        <h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
    </div>
    {#if dragon?.offer?.sellOffer}
        <!-- FOR SALE -->
        <div class="col-3">
            <span class="badge bg-danger">For Sell</span>
        </div>
    {/if}
    {#if dragon?.offer?.rentOffer}
        <!-- FOR RENT -->
        <div class="col-3">
            <span class="badge bg-dark">For Rent</span>
        </div>
    {/if}
</div>