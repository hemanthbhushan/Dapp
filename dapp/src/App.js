import { ethers } from 'ethers';
import React ,{useState}from 'react'
import SimpleStore_abi from "./ContractAbi.json"


const App = () => {
  const contract_address = "0xA125119aa2F00cC6479F4261f866c5210B85C295";
  const[errorMessage,setErrorMessage] = useState(null)
  const [defaultAccount,setDefaultAccount] = useState(null)
  const [connectButtonText,setConnectButtonText] = useState("pleaseConnect");

  const[currentContractVal,setCurrentContractVal] = useState(null);

  const [provider,setProvider] = useState(null);
  const[signer,setSigner] = useState(null);
  const[contract,setContract] = useState(null);

  let connectWalletHandler=()=> {
    if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"}).then(accounts=>accountChangeHandler(accounts[0]));
      setConnectButtonText("wallet connected");

    }else{
      setErrorMessage("metamask is not installed");
    }
 }
 let accountChangeHandler = (newAccount)=>{
  setDefaultAccount(newAccount);
  updateEthers();
}

let updateEthers=()=>{
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(tempProvider);

  let tempSigner = tempProvider.getSigners();
  setSigner(tempSigner);

  let tempContract = new ethers.Contract(contract_address,SimpleStore_abi,tempSigner);
  setContract(tempContract);
}

let getValue = async()=>{
  let x = await contract.retrieve();
  setCurrentContractVal(x);
}
let setHandler = (events)=>{
  events.preventDefault();
  contract.set(events.target.setText.value);
}


  return (
    <div>
      <h1>Dapp Wallet Connection</h1>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>

      <button onClick={getValue}>currentVal</button>
      <h3>Address:{defaultAccount}</h3>
      <form onSubmit={setHandler}>
        <input id="setText" type="text"/>
        <button type={"submit"}>updateContract</button>
      </form>
      {errorMessage}
      {currentContractVal}
    </div>
  )
}

export default App 