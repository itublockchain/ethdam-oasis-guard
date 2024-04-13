export const SemaphoreVerifierABI = [
    {
        inputs: [
            {
                internalType: "uint256[2]",
                name: "_pA",
                type: "uint256[2]",
            },
            {
                internalType: "uint256[2][2]",
                name: "_pB",
                type: "uint256[2][2]",
            },
            {
                internalType: "uint256[2]",
                name: "_pC",
                type: "uint256[2]",
            },
            {
                internalType: "uint256[4]",
                name: "_pubSignals",
                type: "uint256[4]",
            },
            {
                internalType: "uint256",
                name: "merkleTreeDepth",
                type: "uint256",
            },
        ],
        name: "verifyProof",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
