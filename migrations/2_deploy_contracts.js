//setup artifiacts
var MyToken = artifacts.require("MyToken");
var MyTokenSales = artifacts.require("MyTokenSale");

// deploy async, deployer handle access to blockchain
module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    
    // deploy MyTokenSales contract with constructor arguments
    await deployer.deploy(MyToken,       1000000000);
    
    // deploy MyTokenSales contract with constructor arguments
    await deployer.deploy(MyTokenSales,      1, addr[0], MyToken.address);

    let tokenInstance = await MyToken.deployed();

    // transfer from MyToken to MyTokenSales address with 1000000000
    await tokenInstance.transfer(MyTokenSales.address, 1000000000);

};
