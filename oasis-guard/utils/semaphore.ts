import { Identity } from "@semaphore-protocol/identity";
import { BigNumber, ethers } from "ethers";

import {
    AccountABI,
    Address,
    getGaslessProxyContract,
    SAPPHIRE_PROVIDER,
    SemaphoreABI,
} from "~web3";

type SemaphoreProof = {
    merkleTreeDepth: number | bigint;
    merkleTreeRoot: string; // Using string to handle big numbers safely
    nullifier: string; // Using string to handle big numbers safely
    message: string; // Using string to handle big numbers safely
    scope: string; // Using string to handle big numbers safely
    _groupId: string; // Using string to handle big numbers safely
    points: string[]; // Array of strings for big numbers
};

const provider = SAPPHIRE_PROVIDER;

const accountFactory = new ethers.Contract(
    Address.FACTORY,
    AccountABI,
    provider,
);

const semaphore = new ethers.Contract(
    Address.SEMAPHORIDITE,
    SemaphoreABI,
    provider,
);

const readOnlyAccountFactory = accountFactory.connect(provider);
const gaslessProxy = async (calldata: string, address: string) => {
    const CALLDATA = await getGaslessProxyContract().makeProxyTx(
        address,
        calldata,
        10_000_000,
    );

    const tx = await SAPPHIRE_PROVIDER.sendTransaction(CALLDATA);
    const receipt = await tx.wait();

    console.log(receipt);
    return receipt;
};

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

export const createGroup = async (privateKey: string) => {
    const { publicKey, commitment } = new Identity(privateKey);
    const writeSemaphore = semaphore.attach(publicKey.toString());
    const encodedData = writeSemaphore.interface.encodeFunctionData(
        "createGroup",
        [commitment],
    );
    gaslessProxy(Address.SEMAPHORE, encodedData);
};

export const addMemberToGroup = async (
    privateKey: string,
    groupId: BigNumber,
) => {
    const { publicKey, commitment } = new Identity(privateKey);
    const writeSemaphore = semaphore.attach(publicKey.toString());
    const encodedData = writeSemaphore.interface.encodeFunctionData(
        "addMember",
        [groupId, commitment],
    );
};

export const verifyProof = async (
    groupId: BigNumber,
    semaphoreProof: SemaphoreProof,
) => {
    const encodedData = semaphore.interface.encodeFunctionData("verifyProof", [
        groupId,
        semaphoreProof,
    ]);
    gaslessProxy(Address.SEMAPHORE, encodedData);
};
