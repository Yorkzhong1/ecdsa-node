import { useState } from "react";
import server from "./server";
import {ethers} from "ethers"

function Transfer({ address, setAddress,setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);
 
  //generate wallet through private key, and retreive address  
  try{
  const wallet=new ethers.Wallet(privateKey)
  setAddress(wallet.address)
  console.log(address)
 }catch(err){console.log(err)}
  
 
  async function transfer(evt) {
    evt.preventDefault();
    
    let message=JSON.stringify({
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    })
    
  
    try {
      //sign message, and send to server
      let wallet=new ethers.Wallet(privateKey)
      let signature = await wallet.signMessage(message);
      console.log('message and signature', message,signature)

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        message,
        signature,
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          placeholder="0x..."
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
