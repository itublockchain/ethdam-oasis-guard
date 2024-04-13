import { ethers } from "ethers";

import { AccountFactoryABI } from "~web3/abi";
import { Address } from "~web3/addresses";
import { SAPPHIRE_PROVIDER } from "~web3/rpc";

export const FactoryContract = new ethers.Contract(
    Address.FACTORY,
    AccountFactoryABI,
    SAPPHIRE_PROVIDER,
);
