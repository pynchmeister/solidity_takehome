import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { BigNumber } from "@ethersproject/bignumber";
import { AddressZero, Zero, MaxUint256 } from "@ethersproject/constants";
import { toBn } from "evm-bn";
import { ERC20Errors } from "./errors";
import { parseEther } from "ethers/lib/utils";

const { provider } = waffle;
const TEST_AMOUNT = 10;
const TOTAL_SUPPLY = 10000;

describe("erc20", function () {
  let token: ERC20;
  const [wallet] = provider.getWallets();
  let signers: SignerWithAddress[];

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));

    [owner, addr1] = await ethers.getSigners();


    const transferAmount: BigNumber = toBn("5");
  });
  

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

// TODO: Extrapolate sequential signers into owner, recipent spender or alice bob, carol for readability

  describe("transferFrom functionality", async () => {
    // const transferAmount: BigNumber = toBn("5");
    // const tokenAmount: number = 37;
    it("TransferFrom: Should transfer", async function () {
      await token.connect(owner).mint(addr1.address, parseEther("1"));
      await token.connect(addr1).approve(owner.address, parseEther("0.4"));
      await token.transferFrom(addr1.address, owner.address, parseEther("0.4"));
      expect(await token.connect(addr1).balanceOf(addr1.address)).to.equal(parseEther("0.6"));
      expect(await token.connect(addr1).allowance(addr1.address, owner.address)).to.equal(parseEther("0"));
    });
  
    it("TransferFrom: Should fail to transfer (Insufficient balance)", async function () {
      await token.connect(owner).mint(addr1.address, parseEther("1"));
      await token.connect(addr1).approve(owner.address, parseEther("0.4"));
      await expect(token.transferFrom(addr1.address, owner.address, parseEther("5"))).to.be.revertedWith("Insufficient balance");
    });
  
    it("TransferFrom: Should fail to transfer (Insufficient allowance)", async function () {
      await token.connect(owner).mint(addr1.address, parseEther("1"));
      await expect(token.transferFrom(addr1.address, owner.address, parseEther("1"))).to.be.revertedWith("Insufficient allowance");
    });
  //   it("reverts when the recipient address is zero", async () => {
  //     await token.connect(signers[0]).approve(signers[1].address, transferAmount);
  //     await expect(token.connect(signers[1]).transferFrom(signers[0].address, signers[2].address, transferAmount),
  //     ).to.be.revertedWith("ERC20: Transfer Recipient Zero Address");
  //   });
  // });

    // it("reverts when the owner's balance is not sufficient", async () => {

    // });

    // reverts when the owner is zero address

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
});
});