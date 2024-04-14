// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import "@semaphore-protocol/contracts/interfaces/ISemaphoreGroups.sol";

contract Semaphoridite {
    // Deployed Semaphore.sol address on Oasis Sapphire Testnet
    ISemaphore public semaphore;
    ISemaphoreGroups public semaphoreGroups;

    constructor(address _semaphore, address _semaphoreGroups) {
        semaphore = ISemaphore(_semaphore);
        semaphoreGroups = ISemaphoreGroups(_semaphoreGroups);
    }

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
        uint256[8] memory points
    ) internal view returns (bool) {
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

    function generateAndVerifyProof(
        uint256 _groupId,
        uint256 _message
    ) public view returns (ISemaphore.SemaphoreProof memory) {
        uint256 depth = semaphoreGroups.getMerkleTreeDepth(_groupId);
        uint256 root = semaphoreGroups.getMerkleTreeRoot(_groupId);
        uint256 nullifier = 0;
        uint256[8] memory points = [
            uint256(0),
            uint256(0),
            uint256(0),
            uint256(0),
            uint256(0),
            uint256(0),
            uint256(0),
            uint256(0)
        ];
        verifyProof(depth, root, nullifier, _message, _groupId, points);
        return
            ISemaphore.SemaphoreProof(
                depth,
                root,
                nullifier,
                _message,
                _groupId,
                points
            );
    }
}
