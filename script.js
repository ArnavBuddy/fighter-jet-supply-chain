const Web3 = require("web3");

// Step 1: Connect to Ethereum Network (e.g., Ganache, Testnet, or Mainnet)
const web3 = new Web3("http://127.0.0.1:8545"); // Update URL based on your network

// Step 2: Define Contract Details
const contractAddress = "<CONTRACT-ADDRESS>"; // Replace with your deployed contract address
const abi = [
  // ABI JSON Here
];

// Step 3: Create Contract Instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Step 4: Define Interacting Account
const account = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // Replace with your account
const privateKey = "your-private-key-here"; // Replace with your private key

// Step 5: Interact with the Contract
async function interact() {
  try {
    // Example Read: Call a function to get data
    const result = await contract.methods.getData().call();
    console.log("Contract Data:", result);

    // Example Write: Send a transaction to set data
    const tx = {
      to: contractAddress,
      data: contract.methods.setData("newValue").encodeABI(),
      gas: 2000000,
    };

    // Sign Transaction
    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send Transaction
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log("Transaction Receipt:", receipt);
  } catch (error) {
    console.error("Error interacting with contract:", error);
  }
}

// Run Interaction
interact();
