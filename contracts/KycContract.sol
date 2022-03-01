//SPDX-License-Identifier: MIT
pragma solidity >=0.6.1;

import "@openzeppelin/contracts/access/Ownable.sol";


contract KycContract is Ownable{
    mapping(address => bool) allowed;

    function setKycCompleted(address _add) public onlyOwner{
        allowed[_add] =true;
    }

    function setKycRevoked(address _add) public onlyOwner{
        allowed[_add] =false;
    }

    function kycCompleted(address _add) public view returns(bool){
        return allowed[_add];
    }
}