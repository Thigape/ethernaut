// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './RPG.sol';
import './base/Level.sol';

contract RPGFactory is Level, ERC721 {

  constructor() ERC721("RPG_NFT", "RPG") {}

  function createInstance(address _player) override public payable returns (address) {
    _player;
    RPG instance = new RPG();
    _safeMint(address(instance), 0);
    _safeMint(address(instance), 1);
    return address(instance);
  }

  function validateInstance(address payable _instance, address _player) override public returns (bool) {

    return true;
  }
}
