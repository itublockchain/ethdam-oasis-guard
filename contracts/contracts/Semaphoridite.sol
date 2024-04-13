// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Semaphoridite {
    // Deployed Semaphore.sol address on Oasis Sapphire Testnet
    ISemaphore semaphore =
        ISemaphore(0x9245483dB42fFa2087b0577bF247a0cbaaef2E84);

    // Array to store all the group ids
    uint256[] public groupIds;

    // Mapping to check existence of a group id
    mapping(address => uint256) public adminToGroupId;

    function createGroup(address _admin) public {
        uint256 _groupId = semaphore.createGroup(_admin);
        groupIds.push(_groupId);
        adminToGroupId[_admin] = _groupId;
    }

    function getGroup(address _admin) public view returns (uint256) {
        return adminToGroupId[_admin];
    }

    function addMember(uint256 _groupId, uint256 identityCommitment) external {
        semaphore.addMember(_groupId, identityCommitment);
    }

    function removeMember(
        uint256 _groupId,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external {
        semaphore.removeMember(
            _groupId,
            identityCommitment,
            merkleProofSiblings
        );
    }

    function verifyProof(
        uint256 merkleTreeDepth,
        uint256 merkleTreeRoot,
        uint256 nullifier,
        uint256 message,
        uint256 _groupId,
        uint256[8] calldata points
    ) external view returns (bool) {
        ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            message,
            _groupId,
            points
        );

        return semaphore.verifyProof(_groupId, proof);
    }
}
