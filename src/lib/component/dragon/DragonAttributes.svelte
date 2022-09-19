<script>
import { Attributes } from '$lib/helpers/utils.js';
import { iconAttr } from '$lib/storage/dragonImg';

export let attributes
    
</script>

<div class="attrDiv mt-3">
    <h3 class="mb-3">Attributes</h3>
    <div class="row p-0 mt-3">
        {#each attributes as attribute, i}
            <div class="w-50 ta-l">
                <p class="attribute">{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
            </div>
        {/each}
    </div>
</div>