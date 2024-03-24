// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;         

import 'openzeppelin-contracts-08/token/ERC721/ERC721.sol';
import 'openzeppelin-contracts-08/access/Ownable.sol';
                                      
contract RPG is Ownable {        
     mapping(uint256 => address) skins;
     bool newPlayer = true;
  
     function chooseStartSkin(uint256 choice) external {
         require(newPlayer, "You aren't a new player! Buy skins!");
         require(choice >= 0 && choice <= 5, "This NFT doesn't exist");
         ERC721(address(this)).safeTransferFrom(address(this), msg.sender, choice);
         newPlayer = !newPlayer;
     }
}
