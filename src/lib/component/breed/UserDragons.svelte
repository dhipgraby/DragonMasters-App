<script>
    import DragonBox from "./DragonBox.svelte";
    import { afterUpdate } from "svelte";
    
    export let hideDragons;
    export let displayDragons;
    export let allDragons;
    export let gender;

    afterUpdate(() => {
        gender = gender;
        displayDragons = displayDragons;
    });

</script>

<div class="row container" id="dragonGrid">
    {#if displayDragons}
        <h1 class="mt-5">Choose {gender}</h1>
        {#if allDragons != undefined}
            {#each allDragons as dragon}
                <DragonBox
                    dragonProps={dragon}
                    {gender}
                    hide={hideDragons}
                />
            {/each}
        {/if}
    {/if}
</div>

<style>
    #dragonGrid {
        min-height: 50vh;
    }

</style>
