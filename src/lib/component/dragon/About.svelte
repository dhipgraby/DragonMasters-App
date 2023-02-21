<script>

export let dragon
export let dna 
export let maturity

</script>

<div class="attrDiv row p0">
    {#if dragon.mumId === 0 && dragon.dadId === 0}
        <p class="m-0">
            <b>Gen 0 :</b> This dragon have no parents
        </p>
    {:else}
        <div class="col">
            <h3>Parents</h3>
            <hr />
            <p class="m-0">
                <b>MumId:</b>
                <a href="/dragon/{dragon.mumId}">#{dragon.mumId}</a>
            </p>
        </div>

        <div class="col">
            <p class="m-0">
                <b>DadId:</b>
                <a href="/dragon/{dragon.dadId}">#{dragon.dadId}</a>
            </p>
        </div>
    {/if}

    {#if dragon.tokenId == 0}
        <p>This is The <b class="first">First Dragons</b></p>
    {/if}
</div>
<div class="attrDiv mt-3">
    <h3>Dragon Info</h3>
    <hr />
    <p>
        <b>Dragon Id: </b>#{dragon.tokenId}
        <br />
        <b>Type:</b>
        {dragon.subSpecies}
        <br />
        {#if dna}
            <b>DNA:</b>
            {dna.genes}
            <br />
            <b>Generation:</b>
            {dna.generation}
        {/if}
        <br />
        <b>Maturity:</b>
        {maturity}
    </p>
</div>

<style>
    .p0 {
        padding: 15px !important;
    }
</style>