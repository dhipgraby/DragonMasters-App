<main>
	<slot />
</main>


<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;		
		width: 100%;		
        max-width: 1200px;
		margin: 0 auto;
		overflow-y: hidden;
		box-sizing: border-box;
	}

</style>