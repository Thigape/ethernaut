// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;               
                                      
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
                                      
contract GameSkins {                  
                                      
    mapping(uint256 => address) skin;
    mapping(address => uint256) wallet;
    uint256 constant PRICE = 10 ether;

    constructor(ERC721 nft_1, ERC721 nft_2, ERC721 nft_3, uint256 init_wallet) {
        skin[1] = address(nft_1); 
        skin[2] = address(nft_2); 
        skin[3] = address(nft_3); 
        wallet[msg.sender] = init_wallet;
    }                             
                                      
    function buySkin(uint256 skinId) public payable {
        ERC721 nft = ERC721(skin[skinId]);                                              
        require(skinId >= 1 && skinId <= 3, "Invalid skin ID");                         
        require(nft.ownerOf(skinId) != msg.sender, "Skin is already yours");
        require(wallet[msg.sender] >= PRICE, "Not enough ether");
                                    
        wallet[msg.sender] -= PRICE;                       
        nft.safeTransferFrom(address(this), msg.sender, skinId);
    }                             
}
