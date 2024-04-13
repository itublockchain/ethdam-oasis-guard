import { Identity } from "@semaphore-protocol/identity";
import { ethers } from "ethers";

import { AccountABI, Address } from "~web3";

const provider = new ethers.providers.JsonRpcProvider(
    "https://testnet.sapphire.oasis.io",
);

const accountFactory = new ethers.Contract(
    Address.FACTORY,
    AccountABI,
    provider,
);

const readOnlyAccountFactory = accountFactory.connect(provider);

export const getAccountDetails = async (
    signedHash: string,
    signature: string,
    id: string,
) => {
    const publicKey = readOnlyAccountFactory.interface.encodeFunctionResult(
        "getPublicKey",
        [id],
    );
    const accountAddress =
        readOnlyAccountFactory.interface.encodeFunctionResult(
            "getAccountAddress",
            [publicKey],
        );

    const account = new ethers.Contract(accountAddress, AccountABI, provider);
    const readOnlyAccount = account.connect(provider);

    const privateKey = readOnlyAccount.interface.encodeFunctionResult(
        "getPrivateKey",
        [Address.VALIDATOR, signedHash, signature],
    );
    return { publicKey, accountAddress, privateKey };
};

export const signMessage = async (
    signedHash: string,
    signature: string,
    id: string,
    message: string,
) => {
    const { privateKey } = await getAccountDetails(signedHash, signature, id);
    const identity = new Identity(privateKey);
    const signedMessage = identity.signMessage(message);
    const verified = Identity.verifySignature(
        message,
        signedMessage,
        identity.publicKey,
    );
    return { signedMessage, verified };
};
