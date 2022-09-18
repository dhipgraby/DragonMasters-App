<script>
	import { Maturity, Attributes } from '$lib/helpers/utils.js';
	import { getImg, iconElement, iconAttr } from '$lib/storage/dragonImg';    
    import { getEth,shortAddr } from '$lib/helpers/utils'
	import { onMount } from 'svelte';
    //CSS
    import '$lib/css/marketplace/marketplace.css';
    import '$lib/css/marketplace/dragon.css';
    
    export let dragon;
    export let account;	
	export let buy;
    

	$: _maturity = Object.keys(Maturity)[dragon.ageGroup];
    
    let price
    let owner = dragon.sellOffer.owner     
	let img = getImg(dragon.subSpecies).idle;
	let element = iconElement(dragon.subSpecies);

    onMount(async()=>{        
        account = account.toLowerCase()
        owner = owner.toLowerCase()
        if(account === owner){
            owner = 'You'
        } else {
            owner = shortAddr(owner)
        } 
        price = await getEth(dragon.sellOffer.sellPrice)
    })
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		<img src={img} alt="dragon" />
		<!-- ELEMENT -->
		<div class="pabsolute bottom10 right10">{@html element}</div>
		<!-- GENERATION -->
		<div class="pabsolute top10 left10">
			<span class="badge rounded-pill bg-light text-dark mt-2">
				<b>Gen:{dragon.dna.generation}</b>
			</span>
		</div>
		<!-- MATURITY -->
		<div class="pabsolute left10 bottom10 maturity">
			<small><i class="fas fa-seedling" />: {_maturity}</small>
		</div>
	</div>
	<div class="card-body ta-c">
		<p class="card-title">Dragon : #{dragon.tokenId}</p>
		<!--   ATTRIBUTES  -->
		<div class="row p-0 mt-2">
			{#each dragon.attributes as attribute, i}
				<div class="w-50 ta-l">
					<p>{@html iconAttr(Object.keys(Attributes)[i])}: {attribute}</p>
				</div>
			{/each}
		</div>

		<br />
        <div class="priceDiv">
            <small><b>Owner</b>: {owner}</small>
            <p><b>Price:</b>
                {price} <i class="fab fa-ethereum"></i>
            </p>
        </div>
        
        
		<button
			class="btn btn-dark"
			on:click={() => {
				buy(dragon.tokenId,dragon.sellOffer.sellPrice);
			}}
		>
			Buy now <i class="fas fa-shopping-cart"></i>
		</button>
	</div>
</div>
