require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const { MNEMONIC, PROJECT_ID } = process.env;

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://sepolia.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 11155111, // Sepolia network ID
      gas: 5500000, // Gas limit
      confirmations: 2, // Confirmations to wait between deployments
      timeoutBlocks: 200, // Blocks before timeout
      skipDryRun: true, // Skip dry-run
    },
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.21",
    },
  },
};
