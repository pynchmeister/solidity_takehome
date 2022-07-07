import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { BigNumber } from "@ethersproject/bignumber";
import { toBn } from "evm-bn";

const MAX =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const { provider } = waffle;
const TOTAL_SUPPLY = 10000;

describe("erc20", function () {
  let token: ERC20;
  const [wallet] = provider.getWallets();
  let signers: SignerWithAddress[];

  let owner: SignerWithAddress;
  let addr1;
  let addr2;
  let recipient: SignerWithAddress;
  let spender: ERC20;

  let user1: string;
  let user1Acc: SignerWithAddress;
  const tokenAmount: number = 37;

 

  before(async function () {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));

    [owner, addr1, recipient] = await ethers.getSigners();

    user1Acc = signers[1];
    user1 = await user1Acc.getAddress();

    const transferAmount: BigNumber = toBn("5");

    const allowance: BigNumber = await token.allowance(
      signers[0].address,
      signers[1].address,
    );
    
    [owner, addr1, addr2] = await ethers.getSigners();

  });

  async function fixture() {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));
    spender = token.connect(signers[1]);
  }

  describe("transfer functionality", async () => {

    it("transfers successfully", async () => {
      await token.transfer(signers[1].address, ethers.utils.parseEther("5"));
      expect(await token.balanceOf(signers[0].address)).to.be.eq(
        ethers.utils.parseEther("95")
      );
      expect(await token.balanceOf(signers[1].address)).to.be.eq(
        ethers.utils.parseEther("5")
      );
    });

    it("does not transfer more than balance", async () => {
      const tx = token.transfer(
        signers[1].address,
        ethers.utils.parseEther("500")
      );
      await expect(tx).to.be.revertedWith("ERC20: insufficient-balance");
    });
    
  });

  describe("approve functionality", async () => {
    const tokenAmount: number = 37;
    it("approves successfully ", async () => {
      await token.connect(signers[0]).approve(signers[1].address, tokenAmount);
      const allowance: BigNumber = await token.allowance(
        signers[0].address,
        signers[1].address,
      );
      expect(allowance).to.equal(tokenAmount);
      // @info check this article for reference: https://www.freecodecamp.org/news/how-to-write-unit-tests-for-erc-20-ethereum-smart-contracts-abfa2c482aea/
  });

    it("emits an Approval event", async function () {
      await expect(token.connect(signers[0]).approve(signers[1].address, tokenAmount))
        .to.emit(token, "Approval")
        .withArgs(signers[0].address, signers[1].address, tokenAmount);
    });
});

describe("transferFrom functionality", async () => {
  it("transfers successfully using transferFrom & approval", async () => {
    await token.connect(addr1).approve(owner.address, ethers.utils.parseEther("10"));
    await token.transfer(addr1.address, ethers.utils.parseEther("10"));
    await token.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("10"));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("10"));
  });

  it("does not transferfrom without approval", async () => {
    await fixture();
    const tx = spender.transferFrom(
      signers[0].address,
      signers[1].address,
      ethers.utils.parseEther("5")
    );
    await expect(tx).to.be.revertedWith("ERC20: insufficient-allowance");
  });

  it("does not transferfrom more than approval", async () => {
    await token.approve(signers[1].address, ethers.utils.parseEther("4"));
    const tx = spender.transferFrom(
      signers[0].address,
      signers[1].address,
      ethers.utils.parseEther("5")
    );
    await expect(tx).to.be.revertedWith("ERC20: insufficient-allowance");
  });

  it("should not transfer using transferFrom beyond balance", async () => {
    await fixture();
    await token.approve(signers[1].address, ethers.utils.parseEther("500"));
    const tx = spender.transferFrom(
        signers[0].address,
        signers[1].address,
        ethers.utils.parseEther("500")
    );
    await expect(tx).to.be.revertedWith("ERC20: insufficient-balance");
  });
  });
});