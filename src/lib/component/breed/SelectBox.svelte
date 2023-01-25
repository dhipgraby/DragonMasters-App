<script>

export let callback;
export let gender;
export let SubSpecies

</script>

<div class="col-sm-4 p-1">
    <div
        class="eggContainer pointer"
        id="mum"
        on:click={() => callback(gender)}
    >
        <h1 class="egg"><i class="fas fa-egg" /></h1>
        <h3>Select a {SubSpecies} Dragon</h3>
    </div>
</div>
<style>
    
    .col-sm-4 {
        max-width: 250px;
        margin-top: 50px;
        align-self: center;
    }

</style>