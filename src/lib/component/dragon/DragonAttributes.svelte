<script>
import { Attributes } from '$lib/helpers/utils.js';
import { iconAttr } from '$lib/storage/dragonImg';

export let attributes
    
</script>

<div class="mb-3">    
    <div class="row p-0 w-100">
        {#each attributes as attribute, i}
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 ta-l attrBox">
                <p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
            </div>
        {/each}
    </div>
</div>

<style>

    .row {
        margin: auto;
        justify-content: center;
    }

    .attrBox {
        border: solid 1px rgb(177, 177, 177);   
        border-radius: 10px;
        margin:5px 5px;
        padding: 5px 10px;    
        box-shadow: 0px 10px 12px -10px;    
        transition: 0.3s;        
    }

    .attrBox:hover {
        transform: scale(1.1);
    }

    .attrBox p  {
        text-align: center;
        margin: 0px;
        font-weight: 600;
    }
</style>