const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    /**
     * A Signer in ethers.js is an object that represents an Ethereum account. It's used to send transactions to contracts and other accounts. Here we're getting a list of the accounts in the node we're connected to, which in this case is Hardhat Network, and only keeping the first one.
     * */
    const [owner] = await ethers.getSigners();

    /**
     * A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract.
     * */
    const Token = await ethers.getContractFactory("Token");

    /**
     * Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of your smart contract functions.
     */
    const hardhatToken = await Token.deploy();

    /**
       * Once the contract is deployed, we can call our contract methods on hardhatToken and use them to get the balance of the owner account by calling balanceOf().

Remember that the owner of the token who gets the entire supply is the account that makes the deployment, and when using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default. This means that the account in the owner variable executed the deployment, and balanceOf() should return the entire supply amount.
       */
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    /**
     * totalSupply() returns the token's supply amount and we're checking that it's equal to ownerBalance
     */
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
