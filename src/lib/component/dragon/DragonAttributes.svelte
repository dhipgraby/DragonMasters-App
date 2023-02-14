<script>
import { Attributes } from '$lib/helpers/utils.js';
import { iconAttr } from '$lib/storage/dragonImg';

export let attributes
    
</script>

<div class="mb-3">    
    <div class="row p-0">
        {#each attributes as attribute, i}
            <div class="w-50 ta-l">
                <p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
            </div>
        {/each}
    </div>
</div>