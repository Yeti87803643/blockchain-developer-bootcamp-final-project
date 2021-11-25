# BrightLink Design Decisions

## Restricting access

onlyOwner modfier restrcts anyone but the contract owner from taking profits
moving funds in and out of aave can only be done by internal functions

## Inheritance and inter-contract execution
inherits from chainlink and open zeppelin
contract interacts with aave lending pool contracts

## oracles
contract makes calls to external oracles, synthesizes and updates contract state

## upgradeable contracts
aave pool uses a lending pool provider contract

## State Machine
mapping keep strack of status of customer/donor agreements, current data etc
settling request burns agreement

## Circuit Breaker
escapehatch function withdraws all unspent funds back to the contract owner  