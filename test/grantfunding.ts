import { ethers, waffle } from "hardhat";

import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { GrantFunding } from "../typechain/GrantFunding";
import { GrantFunding__factory } from "../typechain/factories/GrantFunding__factory";
import { MockProvider } from "ethereum-waffle";
// import { ERC20 } from "../typechain/ERC20";
// import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import moment from "moment";

const { provider } = waffle;

async function increaseBlockTimestamp(provider: MockProvider, time: number) {
    await provider.send("evm_increaseTime", [time]);
    await provider.send("evm_mine", []);
  };

describe("GrantFunding Vault", function () {

    let token: ERC20;
    let grantFunding: GrantFunding;
    const [wallet] = provider.getWallets();
    let signers: SignerWithAddress[];

    let initialUnlockTime = moment().add(1, "day");
    
    before(async function () {
        signers = await ethers.getSigners();
        const deployer = new ERC20__factory(signers[0]);
        
        token = await deployer.deploy("token", "TKN");
        await token.mint(signers[0].address, ethers.utils.parseEther("100"));
        
        const grantFundingDeployer = new GrantFunding__factory(signers[0]);
        grantFunding = await grantFundingDeployer.deploy();
        
        await token.transfer(grantFunding.address, ethers.utils.parseEther("50")); // needed to give the grantfunding contract some Token balance for grants
    });

    describe("grant creation and removal functionality", async () => {
        let initialUnlockTime = moment().add(1, "day");
        it("creates a new grant successfully", async () => {
            await token.approve(grantFunding.address,ethers.utils.parseEther("7"));
            // @dev must use signer[0] so that msg.sender is referenced
            const tx = await grantFunding.createNewGrant(token.address, ethers.utils.parseEther("7"), signers[1].address, initialUnlockTime.unix(), {gasLimit: 10000000000});
            
            await expect(tx).to.emit(grantFunding, "NewGrantCreated").withArgs(token.address, signers[1].address, ethers.utils.parseEther("7"), initialUnlockTime.unix());
        });

        it("removes grant", async () => {
            await token.approve(grantFunding.address, ethers.utils.parseEther("6"), {gasLimit: 10000000000});

            //console.log(await token.allowance(grantFunding.address, signers[0].address));
            //console.log(await token.balanceOf(signers[0].address));
            //console.log(await token.balanceOf(grantFunding.address));
            //console.log(await token.allowance(signers[0].address, grantFunding.address));

            const tx  = await grantFunding.removeGrant(signers[1].address, {gasLimit: 10000000000});

            await expect(tx)
                .to.emit(grantFunding, "GrantRemoved")
                .withArgs(signers[1].address);

    });

    describe("grant claim functionality", async () => {
        it("claims grant successfully", async () => {
            const unlockTime = moment().add(1, 'day')
            await token.approve(grantFunding.address, ethers.utils.parseEther("10"));
            await grantFunding.createNewGrant(token.address, ethers.utils.parseEther("6"), signers[2].address, initialUnlockTime.unix());
            await increaseBlockTimestamp(provider, unlockTime.unix());
            const tx = await grantFunding.connect(signers[2]).claimGrant(signers[0].address)
            expect(tx)
                .to.emit(grantFunding, "GrantClaimed")
                .withArgs(signers[0].address, token.address, ethers.utils.parseEther("6"));
        });
    });
});
});
