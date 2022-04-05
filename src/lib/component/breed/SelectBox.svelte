<script>

export let callback;
export let gender;

</script>


<div class="col-sm-4 p-1">
    <div
        class="eggContainer pointer"
        id="mum"
        on:click={() => callback(gender)}
    >
        <h1 class="egg"><i class="fas fa-egg" /></h1>
        <h3>Select a Dragon</h3>
    </div>
</div>
<style>
    
    .col-sm-4 {
        align-self: center;
    }

    .eggContainer {
        border-radius: 10px;
        background: #ffffff;
        padding: 70px;
        vertical-align: middle;
    }

    .eggContainer h1,h3 {
        color: #a1a1a1;        
    }

    .eggContainer h3 {
        color: #a1a1a1;        
    }

    .eggContainer:hover h1 {
        color: #444;       
    }
    

</style>