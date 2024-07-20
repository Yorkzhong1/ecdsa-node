const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {ethers} = require('ethers')

app.use(cors());
app.use(express.json());

const balances = {
  "0x03387066271875cf07c02CFc06B6699b4A5ffB7F": 100,
  "0x934faEAaA0154cEed55605580692f3E113324625": 50,
  "0x59AA7219fF589bB25e1EDcb9F59B01171C30d187": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount,message,signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  // console.log(message,signature)
  let recoveredAddress= ethers.verifyMessage(message, signature)
  console.log('recevredAddress',recoveredAddress)
  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
