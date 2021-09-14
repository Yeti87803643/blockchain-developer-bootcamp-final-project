

function addNewCustomer(address _customerAddress){
    // adds customer to mapping
    // maps to agreementID, which increments by 1 each time this func executes
    // maps to donor and agreement value
}

function setBaselineData(address _customer){
    // sets baseine data that will be a threshold for triggering payment
    // this will call a chainlink oracle and grab data rom an API endpoint
}

function depositToAave(){
    // takes deposited funds and send them to a lending pool
    // receive 1 adai token in contract for each dai sent to pool
    // will be internal
}

function withdrawFromAave(){
    // withdraws funds from aave pool ready to transfer to payee
    // will be internal
}

function updateOracleData(address _customer){

    // second call to orace for updated data
    // if the data here exceeds the baseline by a set amount,
    // a payment to the customer will be triggered
}

function settleAgreement(address _customer){
    // withdraws sufficent funds from aave back to contract to settle
    // agreement
    // checks whether updated oracle data exceeds baseline by at
    // least the threshold amount.
    // if so, transfers deposit amount to customer
    // if not, transfers deposit amoutn back to donor

}

function takeProfit(){
    // gathers accrued yield from aave pool and transfers to 
    // contract owner's wallet
}

function escapeHatch(){
    // only for development!
    // transfers unspent LINK and DAI back to contract owner
    // to avoid having to repeatedly visit faucets during dev
}