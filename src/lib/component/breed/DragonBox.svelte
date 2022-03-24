<script>
	import { update_current_dragon } from '$lib/storage/dragon';
	import DragonCard from '../dragon/DragonCard.svelte';
	import SwitchButton from './SwitchButton.svelte';

	export let dragonProps;
	export let gender;
	export let switchBtn = false;
	export let callback = null;

	export let hide = null;

	function chooseDragon() {
		if (hide != null) {
			hide();
			update_current_dragon(dragonProps, gender);
		}
	}
</script>

<div
	on:click={() => chooseDragon()}
	id={'dragon' + dragonProps.tokenId}
	class="col-lg-4 pointer"
	align="left"
>
	<DragonCard dragon={dragonProps} checkBtn={false} />

	{#if switchBtn}
		<SwitchButton {gender} {callback} />
	{/if}

</div>

<style>
	.col-lg-4 {
		position: relative;
	}

</style>
