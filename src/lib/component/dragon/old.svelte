<div class="col-6 rightsideBox">
    <div class="mb-4">
        <h1>Dragon #{dragon.tokenId}</h1>
        <p title={dragon.owner}>Owned by : {@html loadOwner(account, dragon.owner)}</p>
    </div>
    <!-- SELL OFFER -->
    {#if isForSale}
        <div class="attrDiv">
            <div class="d-flex">
                <h3>For Sale</h3>
                {#if isOwner}
                    <div class="divBtn">
                        <button on:click={openSellOption} class="btn btn-light"
                            ><i class="fas fa-edit" /> Edit</button
                        >
                    </div>
                {/if}
            </div>
            <hr />
            <div>
                <h3>
                    Price:
                    {price} <i class="fab fa-ethereum" />
                </h3>
            </div>
            {#if !isOwner}
                <OfferBtn
                    classicBtn={true}
                    _offerType={OfferType.ForSale}
                    buy={() => buyToken()}
                    rent={() => rentToken()}
                    {dragon}
                    {account}
                    displayOwner={true}
                />
            {/if}
        </div>
    {/if}
    <!-- RENT OFFER -->
    {#if isForRent}
        <div class="attrDiv">
            <div class="d-flex">
                <h3>Rent Offer</h3>
                {#if isOwner}
                    <div class="divBtn">
                        <button on:click={openRentOption} class="btn btn-light"
                            ><i class="fas fa-edit" /> Edit</button
                        >
                    </div>
                {/if}
            </div>
            <hr />
            <OfferTerms _offerType={OfferType.ForRent} {rentTerms} {isForSale} salePrice={rentPrice} />
            {#if !isOwner}
                <OfferBtn
                    classicBtn={true}
                    _offerType={OfferType.ForRent}
                    buy={() => buyToken()}
                    rent={() => rentToken()}
                    {dragon}
                    {account}
                    displayOwner={true}
                />
            {/if}
        </div>
    {/if}
    {#if isOwner}
        <SellOption
            {_offerType}
            bind:this={modaComponent}
            noModal={true}
            tokenProps={dragon}
            contract={contract.market}
            {doPromise}
            _tokenType={TokenType.Dragon}
        />
        <!-- LOAD ACTIONS -->
        <RaiseAndEnergy {contract} tokenId={dragon.tokenId} ageGroup={dragon.ageGroup} />
    {/if}
</div>