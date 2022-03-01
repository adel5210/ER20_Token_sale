require("dotenv").config({
    path:"../.env"
});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const Token = artifacts.require("MyToken");

contract("Token test", async (accounts) => {

    const [initialHolder, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    //Test1
    it("Initial supply to token", async() => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    //Test2
    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;

        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        //Test Token SC has initial balanace
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        
        //Test Send 1 token to recipient
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;      
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        
        //Test if recipient amount increase
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
      });
  

    //Test3
    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = this.myToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);

        //Test if initial deployer transfer with max limit token
        await expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
  
        //check if the balance is still the same after attempt sent
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });

});