import React , {useState} from "react";
import {ethers} from "ethers"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
import { getContractAddress } from "ethers/lib/utils";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreetingValue] = useState("")
  
  async function fetchGreeting () {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet()
        setGreetingValue(data)
        console.log('Data:', data)
      }
      catch(err){
        console.log('Error', err)
      }
    }
  }

  async function setGreeting(value) {
    if(!value) return;
    if(!typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.contract(getContractAddress, Greeter.abi, provider)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      fetchGreeting()
      
    }
  }


  return (
    <div>
      
    </div>
  );
}

export default App;
