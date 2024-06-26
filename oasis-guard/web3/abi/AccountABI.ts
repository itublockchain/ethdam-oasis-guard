export const AccountABI = [
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
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string",
                name: "_invitationCode",
                type: "string",
            },
        ],
        name: "acceptInvitation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string",
                name: "_password",
                type: "string",
            },
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
        ],
        name: "addPassword",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string[]",
                name: "_passwords",
                type: "string[]",
            },
            {
                internalType: "string[]",
                name: "_names",
                type: "string[]",
            },
        ],
        name: "addPasswords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string",
                name: "_invitationCode",
                type: "string",
            },
            {
                internalType: "bytes32[2]",
                name: "_recipientPublicKey",
                type: "bytes32[2]",
            },
        ],
        name: "createInvitation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
        ],
        name: "deletePassword",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getNames",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
        ],
        name: "getPassword",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
        ],
        name: "getPasswords",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_validator",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
        ],
        name: "getPrivateKey",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "signedHash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
            {
                internalType: "bytes32[2]",
                name: "pubKey",
                type: "bytes32[2]",
            },
        ],
        name: "validateSignature",
        outputs: [
            {
                internalType: "bool",
                name: "valid",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
