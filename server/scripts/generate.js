const { ethers } = require("ethers");

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

// Get the private key
const privateKey = wallet.privateKey;

console.log("Private Key:", privateKey);

const address = wallet.address;


console.log("Address:", address);

//private key: 0x13430bec049d3adf39d103b197f42d892bf6840933ab8065ac4aba2ed671f21a
//address: 0x03387066271875cf07c02CFc06B6699b4A5ffB7F

//private key: 0xad8100fdb65510231a093ed65a3493f78bc2143959e82a46932efba09a903fe0
//address: 0x934faEAaA0154cEed55605580692f3E113324625

//private key: 0x39f5cb070d7f61d8f73742d97969bbebef43e6eea1ad29634c531abaade6b827
//address: 0x59AA7219fF589bB25e1EDcb9F59B01171C30d187
