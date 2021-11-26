# Protecting against common attacks

## 1. Access modifiers SWC-100
The initial depsoit of DAI into escrow into the contract has to be approved by the spender. This approval is controlled by the spender so that they can approve only up to a specific spend limit. Functions that transfer funds in and out of the Aave lending pool have the access modifier "internal" which means they can only be called from inside the contract. The `takeProfits` function is protected by the `onlyOwner` modifier so that only the contract owner can withdraw accumulated profits from contract storage. Al lother functions have explicitly defined access modifiers, even if that modifier is "public".

## 2. re-entrancy SWC-107
To avoid re-entrancy attacks I have ensured that throughout the contract any transfers of funds (which in this contract include LINK and DAI transfers) only occur after any state changes in the same function. 