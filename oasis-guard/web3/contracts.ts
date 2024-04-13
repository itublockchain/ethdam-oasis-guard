import { ethers, Wallet } from "ethers";

import { AccountFactoryABI } from "~web3/abi";
import { Address } from "~web3/addresses";
import { SAPPHIRE_PROVIDER } from "~web3/rpc";

export const getFactoryContract = (privateKey?: string) => {
    if (privateKey != null) {
        const wallet = new Wallet(privateKey, SAPPHIRE_PROVIDER);
        return new ethers.Contract(Address.FACTORY, AccountFactoryABI, wallet);
    } else {
        return new ethers.Contract(
            Address.FACTORY,
            AccountFactoryABI,
            SAPPHIRE_PROVIDER,
        );
    }
};
