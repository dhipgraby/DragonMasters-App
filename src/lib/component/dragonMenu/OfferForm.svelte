<script>
    import ModifyOffer from '../marketplace/modifyOffer.svelte';
	import CreateOffer from '../marketplace/CreateOffer.svelte';
    
    export let contract
    export let offer
    export let tokenId
    export let formHanlders
</script>

{#if offer}
	<ModifyOffer on:offerModifyed={formHanlders} {offer} {tokenId} {contract} />
{:else}
	<CreateOffer on:offerCreated={formHanlders} {tokenId} {contract} />
{/if}
