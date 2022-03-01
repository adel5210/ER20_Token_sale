require("dotenv").config({
    path:"../.env"
});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

contract("TokenSale test", async (accounts) => {

    const [initialHolder, recipient, anotherAccount] = accounts;

    it("Tokens after deployed no balance", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
    
    it("All tokens should be transferred to TokenSale", async () => {
        let instance = await Token.deployed();
        let balanceOfTokenSaleSC = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();

        return expect(balanceOfTokenSaleSC).to.be.a.bignumber.equal(totalSupply);
    });

    it("Should possible buy tokens in TokenSale" , async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();

        let balanceBefore = await tokenInstance.balanceOf.call(recipient);

        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        await expect(balanceBefore).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);

        await expect(tokenSaleInstance.sendTransaction({
            from: recipient,
            value: web3.utils.toWei("1","wei")
        })).to.be.fulfilled;

        return expect(balanceBefore+1).to.be.a.bignumber.equal(
            await tokenInstance.balanceOf.call(recipient)
        );
    });
});