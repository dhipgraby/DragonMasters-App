<svelte:options accessors={true} />


<script>
    import BasicModal from "../BasicModal.svelte";
    import { afterUpdate,onMount } from "svelte";

    export let dragonProps;
    let price = 1;
   
	
	export let openModal;
	let modaComponent;

    const createOffer = async () => {
        // setForSale(dragonProps.tokenId, price);
        console.log('setting offer')
    };

    let modal_Sell = {
        submit_name: "submit",
        title: "Create marketplace offer",
        callback: createOffer,
    };

    let modal_modify_offer = {
        submit_name: "submit",
        title: "Change offer for token id: <b>" + dragonProps.tokenId + "</b>",
        callback: false,
    };

    let modal_approve = {
        submit_name: "Approve",
        title: "Marketplace Approval",
        callback: false,
    };

    let modalData;

    onMount(() => {
        
        openModal = function(){
			modaComponent.openModal()
		}
        
        updateDragonData(dragonProps)
    });

    afterUpdate(()=>{        
        updateDragonData(dragonProps)
    })    

    function updateDragonData(dragonProps) {
        if (dragonProps.isApproved == true) {
            if (dragonProps.offer) {
                modalData = modal_modify_offer;
            } else {
                modalData = modal_Sell;
            }
        } else {
            modalData = modal_approve;
        }
    }

</script>

<BasicModal
bind:this={modaComponent}
{...modalData}
btnName={false}
id={"dragonModal" + dragonProps.tokenId}>
    {#if dragonProps.isApproved}
        {#if dragonProps.offer}
            <h6>Change offer</h6>
            <div class="group-btn">
                <button class="btn btn-danger text-light" on:click={() => {console.log('removing offer')} }>Remove Offer</button>

                <button class="btn btn-warning text-dark">Modify Offer</button>
            </div>
        {:else}
            <h6>Create a offer in the marketplace</h6>
            <small><b>Token Id {dragonProps.tokenId} </b></small>
            <input class="form-control" type="text" bind:value={price} />
        {/if}
    {:else}      
        <div align="center">
            <h3>Token ID: {dragonProps.tokenId}</h3>
            <h6>Approve the marketplace to sell your NFTs</h6>
            <p><small>Approve marketplace for only this token</small></p>
            <button class="btn btn-danger text-light" data-bs-dismiss="modal" on:click={() => {console.log('single approval')} }>Approve single token</button>
            <br>
            <p><small> Approve marketplace for your tokens</small></p>
            <button class="btn btn-danger text-light" data-bs-dismiss="modal" on:click={() => {console.log('approve for all')} }>Approve for All</button>
        </div>
    {/if}
</BasicModal>



<style>

small {

    font-weight: 800;

}

button {
    white-space: nowrap;
}
    
</style>
