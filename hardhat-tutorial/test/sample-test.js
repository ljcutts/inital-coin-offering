const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require('ethers');
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("CryptoDevToken", () => {
  it("Should be able to mint Tokens correctly", async() => {
     const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    let balance
    const CryptoDevToken = await ethers.getContractFactory("CryptoDevToken");
    const cryptoDevToken = await CryptoDevToken.deploy(
      CRYPTO_DEVS_NFT_CONTRACT_ADDRESS
    );
    await cryptoDevToken.deployed();
     balance = ethers.utils.parseEther("0.001");
    expect(await cryptoDevToken.tokenPrice()).to.equal(balance);
    const tokenPerNFT = 10 * 10 ** 18;
    expect(await cryptoDevToken.tokensPerNFT()).to.equal(
      tokenPerNFT.toString()
    );
    const maxSupply = await cryptoDevToken.maxTotalSupply();
    expect(maxSupply.toString()).to.equal("10000000000000000000000");
  })
})
 