<script>
    import CircleMenu from "../marketplace/CircleMenu.svelte";

    export let showCircleMenu;
    export let removeBtn = false;
    export let removeDragon = null;
    export let img;
    export let element;
    export let maturity;
    export let hovering;
    export let dragon;
    export let contract; 
    export let _tokenType;

</script>
<div class="card-header">
    {#if showCircleMenu}
        <CircleMenu {hovering} tokenProps={dragon} {contract} _tokenType={_tokenType} />
    {/if}

    {#if removeBtn == true}
        <span on:click={() => removeDragon()} class="removeBtn">
            <i class="fas fa-times-circle" />
        </span>
    {/if}
    <!-- DragonImage -->
    <img src={img} alt="dragon" />
    <!-- ELEMENT -->
    <div class="pabsolute bottom10 right10 element">{@html element}</div>
    <!-- GENERATION -->
    <div class="pabsolute top10 left10">
        <span class="badge rounded-pill bg-light text-dark mt-2">
            <b>Gen:{dragon.dna.generation}</b>
        </span>
    </div>
    <!-- MATURITY -->
    <div class="pabsolute left10 bottom10 maturity">
        <small><i class="fas fa-seedling" />: {maturity}</small>
    </div>
</div>
