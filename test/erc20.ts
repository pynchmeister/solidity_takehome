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
  // let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let recipient: SignerWithAddress;
  let spender: SignerWithAddress;

  const transferAmount: BigNumber = toBn("100");
  const tokenAmount: number = 37;

  // beforeEach(async function () {
  //   owner = this.signers.bob;
  //   recipient = this.signers.carol;
  //   spender = this.signers.alice;
  // });

  before(async function () {
    signers = await ethers.getSigners();
    const deployer = new ERC20__factory(signers[0]);
    token = await deployer.deploy("token", "TKN");
    await token.mint(signers[0].address, ethers.utils.parseEther("100"));

    [owner, addr1, recipient, spender] = await ethers.getSigners();


    const transferAmount: BigNumber = toBn("5");

    const allowance: BigNumber = await token.allowance(
      signers[0].address,
      signers[1].address,
    );

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

context("when the owner is a zero address", function () {
  it("reverts", async function () {
    // await token.connect(spender).approve(signers[2].address, tokenAmount);
    await expect(
      token.connect(spender).transferFrom(AddressZero, recipient.address, transferAmount),
    ).to.be.revertedWith("ERC20: TransferSenderZeroAddress");
  });
});

context("when the owner is not a zero address", function () {
  context("when the recipient is a zero address", function () {
    beforeEach(async function () {
      await token.connect(owner).approve(spender.address, transferAmount);
    });

    it("reverts", async function () {
      await expect(
        token.connect(spender).transferFrom(owner.address, AddressZero, ethers.utils.parseEther("5")),
      ).to.be.revertedWith("ERC20: TransferRecipientZeroAddress");
    });
  });

  context("when the recipient is not the zero address", function () {
    context("when the owner does not have enough balance", function () {
      it("reverts", async function () {
        await expect(
          token.connect(spender).transferFrom(owner.address, recipient.address, transferAmount),
        ).to.be.revertedWith(ERC20Errors.InsufficientBalance);
      });
    });

    context("when the owner has enough balance", function () {
      beforeEach(async function () {
        await token.mint(owner.address, transferAmount);
      });
    
      context("When the spender does not have enough allowance", function () {
        it("reverts", async function () {
          await expect(
            token.connect(spender).transferFrom(owner.address, recipient.address, transferAmount),
          ).to.be.revertedWith(ERC20Errors.InsufficientAllowance);
        });
      });

      context("when the spender has enough allowance", function () {
        beforeEach(async function () {
          await token.connect(owner).approve(spender.address, transferAmount);
        });

        it("emits a Transfer event", async function () {
          await expect(
            token.connect(spender).transferFrom(owner.address, recipient.address, transferAmount),
          )
          .to.emit(token, "Transfer")
          .withArgs(owner.address, recipient.address, transferAmount);
        });

        it("emits an Approval event", async function () {
          await expect(
            token.connect(spender).transferFrom(owner.address, recipient.address, transferAmount),
          )
          .to.emit(token, "Approval")
          .withArgs(owner.address, spender.address, Zero);
        });
      });
    });
  });
});
});
});