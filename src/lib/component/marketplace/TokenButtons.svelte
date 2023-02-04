<script>
	import { TokenType } from '$lib/contracts/Marketplace';

	export let changeToken;
	let _tokenType = TokenType.Egg;
</script>

<div>
	<p class="bold">Select token Type</p>
	<select class="form-select mb-3 " bind:value={_tokenType} on:change={() => changeToken(_tokenType)}>
		<option value={TokenType.Egg} selected>Egg</option>
        <option value={TokenType.Dragon}>Dragon</option>		
	</select>
</div>

<style>
    div {
		width: 100%;
		text-align: left;
        margin-top: 20px;
    }
	p {
        margin-bottom: 10px;
		letter-spacing: 1px;
	}
	.form-select {
		width: 220px;
	}
</style>
