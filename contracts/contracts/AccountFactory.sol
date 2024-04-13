// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./Account.sol";

contract AccountFactory {
    // Event to log the creation of a new Account contract
    event AccountCreated(address indexed accountAddress, bytes32[2] publicKey);

    // Array to store addresses of all the created Account contracts
    address[] private accounts;

    // Public key to account mapping
    mapping(bytes32 => address) private publicKeyToAccount;

    /**
     * @dev Creates a new Account contract with the provided public key and logs the event
     * @param _publicKey The public key to be used with the new Account
     * @param _privateKey The private key to be used with the new Account
     * @return accountAddress The address of the newly created Account contract
     */
    function createAccount(
        bytes32[2] memory _publicKey,
        bytes32 _privateKey
    ) public returns (address accountAddress) {
        Account newAccount = new Account(_publicKey, _privateKey); // Create a new Account contract
        accounts.push(address(newAccount)); // Store the address of the created Account contract
        publicKeyToAccount[hashPublicKey(_publicKey)] = address(newAccount); // Map the public key to the Account address
        emit AccountCreated(address(newAccount), _publicKey); // Log the event
        return address(newAccount); // Return the address of the new Account
    }

    function hashPublicKey(
        bytes32[2] memory _publicKey
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_publicKey));
    }

    function getAccountAddress(
        bytes32[2] memory _publicKey
    ) public view returns (address) {
        return publicKeyToAccount[hashPublicKey(_publicKey)];
    }
}
