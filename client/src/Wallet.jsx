import server from "./server";
import { ethers } from 'ethers';

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address  = evt.target.value;
    setAddress(address);
    // console.log('privateKey: ',privateKey)
    // const wallet=new ethers.Wallet(privateKey);
    // setAddress(wallet.address)
    
    // setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
    console.log('address',address)
    console.log('balance',balance)
  }

  return (
    <div className="container wallet">
      <h1>Your Address</h1>

      <label>
        Address 
        <input placeholder="Type an address, for example: 0x1..." value={address} onChange={onChange}></input>
        
      </label>  

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
