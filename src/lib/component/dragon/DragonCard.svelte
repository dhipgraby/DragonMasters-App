<script>
	export let dragon;
	export let contract;
</script>

<div class="card" style="width: 18rem;">
	<div class="card-header">
		
        <img src="/images/dragon.png" alt="dragon" />

	</div>
	<div class="card-body">
		<h5 class="card-title">Dragon : #{dragon.tokenId}</h5>
		<hr />
		<p class="card-text">
			<b>MumId:</b>
			{dragon.mumId}
			<br />
			<b>DadId:</b>
			{dragon.dadId}
		</p>
	</div>
</div>

<style>

    img {
        widows: 100%;
    }

	p {
		font-weight: 600;
		color: #999999;
	}
	.card {
		border-radius: 20px;
		margin: 10px;
		transition: 0.5s;
	}

	.card:hover {
		box-shadow: 0px 10px 20px -8px;
	}

	.card-title {
		color: #737373;
		font-size: 20px;
		font-weight: 600;
	}

	.card-header {
		border-radius: 20px 20px 0px 0px;
		cursor: pointer;
		padding: 20px 0px;
		background-color: #f2fffb;
		background: linear-gradient(20deg, #f2fffb, #b3b3b3);
	}

	.card-body {
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
</style>
