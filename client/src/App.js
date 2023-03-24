import { useState, useEffect } from "react";
import Web3 from "web3";
import organisation from "./contracts/organisation.json";
import "./App.css";
import Investors from "./components/Investors/Investors";
import Manager from "./components/Manager/Manager";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [avaFund, setAvaFund]= useState(0);
  
  useEffect(() => {
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = organisation.networks[networkId];
    
      const contract = new web3.eth.Contract(
        organisation.abi,
        deployedNetwork.address
      );
      console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);

  useEffect(() => {
    const { web3 } = state;
    console.log(web3);
    console.log("hi");
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);
   function Change(a){
      setAvaFund(a);
    }
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };
  
  useEffect(()=>{
    const {contract}=state;
    async function fundsAvailability(){
      const fund = await contract.methods.avaliableFund().call();
      setAvaFund(fund);

    }
    contract && fundsAvailability();
  },[state])
  
  return (
    <div className="App">
   <p className="ca">Connected Account:{account}</p>
   <p className="ca">Available Funds:{avaFund} Wei</p>
   <form className="label0" id="myForm">
        <label htmlFor="">Choose an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option></option>
        </select>
      </form>
      <p>For Manager Only</p>
      <Manager state={state} account={account} ></Manager>
      <p>For Investors Only</p>
     <Investors state={state} account={account} ></Investors>
    
    </div>
  );
}
export default App;