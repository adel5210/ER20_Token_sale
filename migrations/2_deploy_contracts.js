//setup artifiacts
var MyToken = artifacts.require("MyToken");
var MyTokenSales = artifacts.require("MyTokenSale");
var MyKycContract = artifacts.require("KycContract");

//Configuration file from .env 
//npm install --save dotenv
require("dotenv").config({
    path:"../.env"
});

// deploy async, deployer handle access to blockchain
module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    
    // deploy MyTokenSales contract with constructor arguments
    await deployer.deploy(MyToken,       process.env.INITIAL_TOKENS);
    
    await deployer.deploy(MyKycContract);

    // deploy MyTokenSales contract with constructor arguments 1 wei - token, token which gets money 
    await deployer.deploy(MyTokenSales,      1, addr[0], MyToken.address, MyKycContract.address);

    let tokenInstance = await MyToken.deployed();

    // transfer from MyToken to MyTokenSales address with 1000000000
    await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);

};
