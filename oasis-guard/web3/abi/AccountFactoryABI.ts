export const AccountFactoryABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "accountAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32[2]",
                name: "publicKey",
                type: "bytes32[2]",
            },
        ],
        name: "AccountCreated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32[2]",
                name: "_publicKey",
                type: "bytes32[2]",
            },
            {
                internalType: "bytes32",
                name: "_privateKey",
                type: "bytes32",
            },
            {
                internalType: "bytes8",
                name: "_id",
                type: "bytes8",
            },
        ],
        name: "createAccount",
        outputs: [
            {
                internalType: "address",
                name: "accountAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32[2]",
                name: "_publicKey",
                type: "bytes32[2]",
            },
        ],
        name: "getAccountAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes8",
                name: "_id",
                type: "bytes8",
            },
        ],
        name: "getPublicKey",
        outputs: [
            {
                internalType: "bytes32[2]",
                name: "",
                type: "bytes32[2]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32[2]",
                name: "_publicKey",
                type: "bytes32[2]",
            },
        ],
        name: "hashPublicKey",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "id",
        outputs: [
            {
                internalType: "bytes8",
                name: "",
                type: "bytes8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
