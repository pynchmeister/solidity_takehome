import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { BigNumber } from "@ethersproject/bignumber";

const { provider } = waffle;

describe("erc20", function () {
  let token: ERC20;
  const [wallet] = provider.getWallets();
  let signers: SignerWithAddress[];

  before(async function () {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));
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

  describe("transferFrom functionality", async () => {

    it("transfers successfully**", async () => {


  });
});

  describe("approve functionality", async () => {
    const tokenAmount: number = 37;
    it("approves successfully", async () => {
      await token.connect(signers[0]).approve(signers[1].address, tokenAmount);
      const allowance: BigNumber = await token.allowance(
        signers[0].address,
        signers[1].address,
      );
      expect(allowance).to.equal(tokenAmount);

      // TODO: check the allowance array is properly filled
      // TODO: check the Approval Event is emitted

      // WIP

      // const tokenAmount: number = 37;
      // const txResult1 = await token.connect(signers[0].address).approve(signers[0].address, tokenAmount);
      // await txResult1.wait();
      // const txResult2 = await token.connect(signers[1].address).approve(signers[1].address, tokenAmount);
      // await txResult2.wait();
      // expect(await token.allowance(signers[0].address, signers[1].address)).to.equal(tokenAmount);

  });

    it("emits an Approval event", async function () {
      await expect(token.connect(signers[0]).approve(signers[1].address, tokenAmount))
        .to.emit(token, "Approval")
        .withArgs(signers[0].address, signers[1].address, tokenAmount);
    });
});
});
