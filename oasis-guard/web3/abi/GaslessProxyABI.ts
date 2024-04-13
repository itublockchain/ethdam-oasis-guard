export const GaslessProxyABI = [
    {
        inputs: [],
        name: "DER_Split_Error",
        type: "error",
    },
    {
        inputs: [],
        name: "recoverV_Error",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "innercallAddr",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "innercall",
                type: "bytes",
            },
            {
                internalType: "uint64",
                name: "gasLimit",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
            },
        ],
        name: "makeProxyTx",
        outputs: [
            {
                internalType: "bytes",
                name: "output",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "proxy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "addr",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "secret",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint64",
                        name: "nonce",
                        type: "uint64",
                    },
                ],
                internalType: "struct EthereumKeypair",
                name: "keypair",
                type: "tuple",
            },
        ],
        name: "setKeypair",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];
