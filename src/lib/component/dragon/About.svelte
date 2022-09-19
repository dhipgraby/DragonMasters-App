<script>

export let dragon
export let dna 
export let maturity

</script>

<div class="attrDiv row p-0">
    {#if dragon.mumId == 0 && dragon.dadId == 0}
        <p class="m-0">
            <b>Gen 0 : This dragon have no parents</b>
        </p>
    {:else}
        <div class="col">
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
   
    <p class="card-text">
        <b>Dragon ID: #{dragon.tokenId}</b>
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