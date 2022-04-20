<script>
	import DragonLogo from "$lib/component/dragon/DragonLogo.svelte";
	import { getImg } from "$lib/storage/dragonImg";

	let sleeping = getImg('fire').sleep
	let element = 'fire'

	function changeElem(elem){
		element = elem
		change('idle')
	}

	function change(state){

		switch(state){
			case 'sleep':
			sleeping = getImg(element).sleep
			break;
			case 'fly':
			sleeping = getImg(element).fly
			break;
			case 'idle':
			sleeping = getImg(element).idle
			break;
			case 'egg':
			sleeping = getImg(element).egg
			break;
			case 'segg':
			sleeping = getImg(element).segg
			break;
		}

	}


</script>

<svelte:head>
	<title>Dragon-masters</title>
</svelte:head>

<div class="mt-5" align="center">
	<h1><i class="fas fa-dragon" /></h1>
	<h1 class="reflex-box">Dragon Masters NFTs</h1>

	<img width="300px" alt="sleep" src={sleeping} />

<button on:click={()=> change('sleep') }>Sleep</button>
<button on:click={()=> change('idle') }>Idle</button>
<button on:click={()=> change('fly') }>Fly</button>
<button on:click={()=> change('egg') }>Egg</button>
<button on:click={()=> change('segg') }>Special</button>

<br>
<button on:click={()=> changeElem('fire') }>fire</button>
<button on:click={()=> changeElem('water') }>Water</button>
<button on:click={()=> changeElem('earth') }>Earth</button>
<button on:click={()=> changeElem('air') }>Air</button>




	<div class="mt-4" align="center">
		<DragonLogo />
	</div>
</div>
