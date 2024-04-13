import { ethers } from "ethers";

import { Address } from "~web3/addresses";
import { SAPPHIRE_PROVIDER } from "~web3/rpc";

export const FactoryContract = new ethers.Contract(
    Address.FACTORY,
    [],
    SAPPHIRE_PROVIDER,
);
