//SPDX-License-Identifier: MIT
pragma solidity >= 0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    constructor(uint256 initialSupply) ERC20("StarDucks Capu-Token", "SCT") public{
        _mint(msg.sender, initialSupply);
        _setupDecimals(0); // decimal places .... split of tokens
    }
}