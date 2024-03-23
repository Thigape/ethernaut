// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './base/Level.sol';
import './OurLevel.sol';

contract GameSkinsFactory is Level {

  function createInstance(address _player) override public payable returns (address) {
    _player;
    
    return address(new OurLevel());
  }

  function validateInstance(address payable _instance, address _player) override public view returns (bool) {
    OurLevel ourLevel = OurLevel(_instance);
    return;
  }
}
