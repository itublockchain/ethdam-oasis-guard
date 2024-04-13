import { ethers, type ContractReceipt } from "ethers";

import { getGaslessProxyContract, SAPPHIRE_PROVIDER } from "~web3";

type Props = {
    contractAddress: string;
    abi: Array<object>;
    params: Array<any>;
    functionName: string;
};

export const sendGaslessTx = async ({
    contractAddress,
    abi,
    params,
    functionName,
}: Props): Promise<ContractReceipt> => {
    const accountFactoryInterface = new ethers.utils.Interface(abi);
    const calldata = accountFactoryInterface.encodeFunctionData(
        functionName,
        params,
    );

    const paymasterAddress = "0x95437A74D748cE3870e8Fa3d7c1AA5002EC82c04";
    const nonce = SAPPHIRE_PROVIDER.getTransactionCount(paymasterAddress);

    const accountCreationMetaTx = await getGaslessProxyContract().makeProxyTx(
        contractAddress,
        calldata,
        10_000_000,
        nonce,
    );

    const tx = await SAPPHIRE_PROVIDER.sendTransaction(accountCreationMetaTx);
    const receipt = await tx.wait();
    return receipt;
};
