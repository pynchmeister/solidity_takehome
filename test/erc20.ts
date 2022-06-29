import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { BigNumber } from "@ethersproject/bignumber";
import { AddressZero, Zero, MaxUint256 } from "@ethersproject/constants";
import { toBn } from "evm-bn";
import { ERC20Errors } from "./errors";

const { provider } = waffle;
const TEST_AMOUNT = 10;
const TOTAL_SUPPLY = 10000;

describe("erc20", function () {
  let token: ERC20;
  const [wallet] = provider.getWallets();
  let signers: SignerWithAddress[];

  before(async function () {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));

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
    const tokenAmount: number = 37;
    it("transferFrom successfully", async () => {
      await token.connect(signers[0]).approve(signers[1].address, MaxUint256);
      await expect(token.connect(signers[0]).transferFrom(signers[1].address, signers[0].address, TEST_AMOUNT))
        .to.emit(token, "Transfer")
        .withArgs(signers[1].address, signers[0].address, TEST_AMOUNT)
      expect(await token.allowance(signers[1].address, signers[0].address)).to.eq(tokenAmount)
      expect(await token.balanceOf(signers[1].address)).to.eq(TOTAL_SUPPLY - (TEST_AMOUNT))
      expect(await token.balanceOf(signers[0].address)).to.eq(TEST_AMOUNT)

      // ).to.be.revertedWith("Owner is zero address");
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