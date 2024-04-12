// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./Account.sol";

contract AccountFactory {
    // Event to log the creation of a new Account contract
    event AccountCreated(address indexed accountAddress);

    // Array to store addresses of all the created Account contracts
    address[] private accounts;

    /**
     * @dev Creates a new Account contract with the provided public key and logs the event
     * @param _publicKey The public key to be used with the new Account
     * @return accountAddress The address of the newly created Account contract
     */
    function createAccount(
        bytes32[2] memory _publicKey
    ) public returns (address accountAddress) {
        Account newAccount = new Account(_publicKey); // Create a new Account contract
        accounts.push(address(newAccount)); // Store the address of the created Account contract
        emit AccountCreated(address(newAccount)); // Log the event
        return address(newAccount); // Return the address of the new Account
    }
}
