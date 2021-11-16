import React, {useEffect, useState} from 'react';
import "./App.css";
import Web3 from 'web3'
import background from "./TreeBorder2.jpg";
import BrightLink from './artifacts/contracts/BrightLink.json';
import map from "./artifacts/deployments/map.json";
import {getEthereum} from "./getEthereum"

// uses functional component syntax
function App(){

  const [account, setOwnerAccount] = useState()
  const [chainID, setChainID] = useState()
  const [network, setNetwork] = useState()
  const [contractAddress, setContractAddress] = useState()
  const [contract, setContract] = useState()
  const[customerAddress, setCustomerAddress] = useState()
  const[donorAddress, setDonorAddress] = useState()
  const [agreementValue, setAgreementValue] = useState()
  const[weight1, setWeight1] = useState()
  const[weight2, setWeight2] = useState()
  const[weight3, setWeight3] = useState()
  const [connected, connect] = useState()

  
  // loadBlockChain detects metamask account
  // and network ID 
  async function loadBlockChain(){

    const ethereum = await getEthereum()
    let web3

    if (ethereum) {
        web3 = new Web3(ethereum)
    } else if (window.web3) {
        web3 = window.web3
    } else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider)
    }

    // // Try to enable accounts (connect metamask)
    // const ethereum = await getEthereum()
    const accounts = await ethereum.request({method:'eth_requestAccounts'})
    const chain = await web3.eth.getChainId()
    const net = await web3.eth.net.getNetworkType()

    //const accounts = await web3.eth.getAccounts()
    const acc = accounts[0]
    console.log("web3: " + web3)
    console.log("accounts: " + accounts)
    console.log("connected account: " + acc)

    setNetwork(net)
    setChainID(chain)
    setOwnerAccount(acc)

    var address = ''

    if (chain =='1337'){
      address = map["dev"]['BrightLink'][0]
    }
    else if(chain == 42){
      address = map["42"]['BrightLink'][0]
    }
    else if(chain==3){
      address = map["3"]['BrightLink'][0]
    }
    else if(chain==4){
       address = map["4"]['BrightLink'][0]
    }
    else{
      throw 'Please connect to a valid testnet'
    }

    setContractAddress(address)
    const _contract = new web3.eth.Contract(BrightLink.abi, address, acc)

    setContract(_contract)
    console.log("address: " + address)
    console.log("contract:  " + _contract)
    console.log("chain: " + chain)
    console.log("contract successfully loaded")
    
    setWeight1(100)
    setWeight2(100)
    setWeight3(100)
    
    if (account){
      connect(true)
    }
  }



  async function AddNewCustomer(){

    console.log("INSIDE FUNC, account = " + account)
    await contract.methods.addNewCustomer(customerAddress,donorAddress,agreementValue)
      .send({'from':account})
        .then(console.log("successfully added new customer"))
    
    console.log(customerAddress)
    console.log(donorAddress)
    console.log(agreementValue)
    console.log(typeof(contract))

  }

  async function setBaseLine(){
    await contract.methods.setBaseLine(customerAddress,weight1,weight2,weight3)
      .send({'from':account})
        .then(console.log("successfully set base line"))
  }

  async function getNewData(){
    await contract.methods.UpdateOracleData(customerAddress,weight1,weight2,weight3)
      .send({'from':account})
        .then(console.log("successfully set base line"))
  }

  async function settleAgreement(){
    await contract.methods.settleAgreement(customerAddress)
    .send({'from':account})
      .then(console.log("successfully set base line"))

  }
  

  return (
  
    <div 
    className="App" 
    style={{ backgroundImage: 'url(' + background + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  
    }}>
    
    <br></br>
    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <h1>BrightLink </h1>
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <h2>Incentivized urban greening validated by satellite data</h2>
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    {<button onClick={loadBlockChain} > Connect Wallet</button>}
    </li>
      
    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'green'}}>
    {connected? <p><b>CONNECTED!</b></p> : null}
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <p>Contract is deployed at: {contractAddress}</p>
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <p>Connected to account: {account}</p>
    </li>

      
    <br></br>
    <br></br>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <p><h3>Start new project </h3></p>
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
      <p>Customer (Ethereum address)&nbsp;&nbsp;&nbsp;&nbsp;</p>

    <input 
      type="text"
      value={customerAddress}
      placeholder="Set Customer Address"
      onChange={e => setCustomerAddress(e.target.value)} />
      </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <p>Donor (Ethereum address)&nbsp;&nbsp;&nbsp;&nbsp;</p>

    <input 
        type="text"
        value={donorAddress}
        placeholder="Set Donor Address"
        onChange={e => setDonorAddress(e.target.value)} />
    </li>

    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    <p>Funding Value (Dai)&nbsp;&nbsp;&nbsp;&nbsp;</p>

    <input
      type="text"
      value={agreementValue}
      placeholder="Set Agreement Value"
      onChange={e => setAgreementValue(e.target.value)} />
    </li>
    <br></br>
    <li style={{display: 'flex', justifyContent:'center', alignItems:'center', color: 'black'}}>
    {<button onClick={AddNewCustomer}>CONFIRM</button>}
    </li>

    <br></br>
    <br></br>

    <p><b>Change satellite weightings and query remote sensing data</b></p>
    <p><i>(please send 0.6 LINK to the contract to fund these queries</i></p>
    <input
      type="text"
      value={weight1}
      placeholder="Set weight for Sentinel (%)"
      onChange={e => setWeight1(e.target.value)} />

    <input
      type="text"
      value={weight2}
      placeholder="Set weight for Landsat (%)"
      onChange={e => setWeight2(e.target.value)} />

    <input
      type="text"
      value={weight3}
      placeholder="Set weight for MODIS (%)"
      onChange={e => setWeight3(e.target.value)} />


    {<button onClick={setBaseLine}>Set Baseline</button>}
    {<button onClick={getNewData}>Get Updated Data</button>}

    <br></br>
    <br></br>
    {<button onClick={settleAgreement}>Request Payout</button>}
    
    </div>

  );
  }


export default App
