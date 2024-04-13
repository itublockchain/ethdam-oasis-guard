//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CommentBox {
    string[] public comments;

    function comment(string memory commentText) external {
        comments.push(commentText);
    }
}
