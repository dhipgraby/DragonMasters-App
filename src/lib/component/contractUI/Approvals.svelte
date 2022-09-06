<script>
        
        export let contract;        
        
        let approveId,
        singleApproval,
		revokeId;
        
</script>

<div class="grid col-4 m-2">
    <div align="center">
        <h1>Approvals</h1>
    </div>
    <!-- APPROVALS -->
    <table class="table table-striped">
        <tr>
            <h2>Check if Approve for All</h2>
            <button class="btn btn-dark" on:click={() => contract.isApprovedForAll(true)}
                >Check Approval</button
            >
        </tr>
        <tr>
            <h2>Approve for All</h2>
            <button class="btn btn-dark" on:click={() => contract.approveForAll()}>APPROVE ALL</button>
        </tr>

        <tr>
            <h2>Check Dragon Approval</h2>
            <div class="mb-3">
                <input
                    type="text"
                    bind:value={singleApproval}
                    class="form-control"
                    placeholder="Token Id"
                />
            </div>
            <button class="btn btn-dark" on:click={() => contract.getApproved(singleApproval, true)}
                >Check Approve</button
            >
        </tr>

        <tr>
            <h2>Approve Token</h2>
            <div class="mb-3">
                <input type="text" bind:value={approveId} class="form-control" placeholder="Token Id" />
            </div>
            <button class="btn btn-dark" on:click={() => contract.approveToken(approveId)}
                >APPROVE</button
            >
        </tr>
        <tr>
            <h2>Revoke Approve for All</h2>
            <button on:click={() => contract.removeApproveForAll()} class="btn btn-danger">
                Remove Approve for all
            </button>
        </tr>
        <tr>
            <h2>Revoke Token</h2>
            <div class="mb-3">
                <input type="text" bind:value={revokeId} class="form-control" placeholder="Token Id" />
            </div>
            <button class="btn btn-danger" on:click={() => contract.revokeToken(revokeId)}
                >REVOKE</button
            >
        </tr>
    </table>
</div>


<style>
	.btn-danger {
		font-weight: 600;
		letter-spacing: 1px;
	}
    
	.grid h1 {
		font-size: 36px;
	}
</style>
