const { ethers } = require("ethers");

// Example signed message and signature
const message = "Hello, world!";

// Our signer; Signing messages does not require a Provider
signer = new ethers.Wallet("0xc6eddc2aec4ed45d7add2f267af186689f1c433b01ff30bed8d0c1896d410fcc");


// Signing the message
const signMessage=async () => {
    sig = await signer.signMessage(message);
    console.log(sig)

    console.log(ethers.verifyMessage(message, sig))
}

signMessage()
// '0xefc6e1d2f21bb22b1013d05ecf1f06fd73cdcb34388111e4deec58605f3667061783be1297d8e3bee955d5b583bac7b26789b4a4c12042d59799ca75d98d23a51c'
