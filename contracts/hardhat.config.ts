import "@oasisprotocol/sapphire-hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
console.log(process.env.PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    "sapphire-testnet": {
      // This is Testnet! If you want Mainnet, add a new network config item.
      url: "https://testnet.sapphire.oasis.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [""],
      chainId: 0x5aff,
    },
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
