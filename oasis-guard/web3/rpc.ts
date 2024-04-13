import { ethers } from "ethers";

export const SAPPHIRE_RPC_URL = "https://testnet.sapphire.oasis.io";
export const SAPPHIRE_CHAIN_ID = 23295;
export const SAPPHIRE_CHAIN_NAME = "Sapphire";

export const SAPPHIRE_PROVIDER = new ethers.providers.JsonRpcProvider(
    SAPPHIRE_RPC_URL,
);
