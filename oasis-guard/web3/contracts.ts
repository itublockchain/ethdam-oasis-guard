import { ethers, Wallet } from "ethers";

import { AccountFactoryABI, GaslessProxyABI } from "~web3/abi";
import { Address } from "~web3/addresses";
import { SAPPHIRE_PROVIDER } from "~web3/rpc";

export const getFactoryContract = (privateKey?: string) => {
    const signerOrProvider =
        privateKey != null
            ? new Wallet(privateKey, SAPPHIRE_PROVIDER)
            : SAPPHIRE_PROVIDER;

    return new ethers.Contract(
        Address.FACTORY,
        AccountFactoryABI,
        signerOrProvider,
    );
};

export const getGaslessProxyContract = (privateKey?: string) => {
    const signerOrProvider =
        privateKey != null
            ? new Wallet(privateKey, SAPPHIRE_PROVIDER)
            : SAPPHIRE_PROVIDER;

    return new ethers.Contract(
        Address.GASLESS_PROXY,
        GaslessProxyABI,
        signerOrProvider,
    );
};
