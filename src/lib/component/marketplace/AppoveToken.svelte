<script>
    export let tokenId
</script>

<div align="center">
    <h3>Token ID: {tokenId}</h3>
    <h6>Approve the marketplace to sell your NFTs</h6>
    <p><small>Approve marketplace for only this token</small></p>
    <button
        class="btn btn-danger text-light"
        data-bs-dismiss="modal"
        on:click={() => {
            console.log('single approval');
        }}>Approve single token</button
    >
    <br />
    <p><small> Approve marketplace for your tokens</small></p>
    <button
        class="btn btn-danger text-light"
        data-bs-dismiss="modal"
        on:click={() => {
            console.log('approve for all');
        }}>Approve for All</button
    >
</div>