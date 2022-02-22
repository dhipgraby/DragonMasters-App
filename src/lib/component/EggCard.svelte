<script>
	export let egg;
</script>

<div class="col-md-4">
	<div class="card" style="width: 18rem;">
		<div class="card-header">
			<div id="egg" />
		</div>
		<div class="card-body">
			<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			<hr />
			<p class="card-text">
				<b>MumId:</b>
				{egg.mumId}
				<br />
				<b>DadId:</b>
				{egg.dadId}
			</p>
			<button class="btn btn-dark">Start Incubation</button>
		</div>
	</div>
</div>

<style>


    button {
        padding: 8px 24px;
        border-radius: 50px;
    }

	p {
		font-weight: 600;
		color: #999999;
	}
	.card {
		
		border-radius: 20px;
		margin: 10px;
        overflow: hidden;
        transition: 0.5s;
    }

    .card:hover {
        box-shadow: 0px 10px 20px -8px;
    }
	
    .card-title {
        font-size: 22px;
        font-weight: 600;
    }

    .card-header {
        padding: 20px 0px;
        background-color: #f2fffb;
    }

	.card-body {
		text-align: center;
	}

	.card-text {
		text-align: left;
	}
	#egg {
		margin: auto;
		display: block;
		width: 132px;
		height: 174px;
		background-color: #d8d8d8;
		background: linear-gradient(229deg, #246655, #3391ee, #9e3a3a, #e0e0e0);
		background-size: 800% 800%;
		-webkit-border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
		box-shadow: 0px 15px 24px -10px #595959;
		-webkit-animation: AnimationName 18s ease infinite;
		-moz-animation: AnimationName 18s ease infinite;
		animation: AnimationName 18s ease infinite;
	}

	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 96%;
		}
		50% {
			background-position: 100% 5%;
		}
		100% {
			background-position: 0% 96%;
		}
	}
</style>
