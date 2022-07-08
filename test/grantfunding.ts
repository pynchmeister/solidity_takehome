import { expect } from "chai";
import { ethers, waffle } from "hardhat";
// import { ERC20 } from "../typechain/ERC20";
// import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ERC20 } from "../typechain/ERC20";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { GrantFunding } from "../typechain/GrantFunding";
import { GrantFunding__factory } from "../typechain/factories/GrantFunding__factory";

const { provider } = waffle;

describe("GrantFunding", function () {

    let token: ERC20;
    let grantFunding: GrantFunding;
    const [wallet] = provider.getWallets();
    let signers: SignerWithAddress[];
    
    before(async function () {
        signers = await ethers.getSigners();
        const deployer = new ERC20__factory(signers[0]);
        token = await deployer.deploy("token", "TKN");
        await token.mint(signers[0].address, ethers.utils.parseEther("100"));

        const grantFundingDeployer = new GrantFunding__factory(signers[0]);
        let grantFunding = await grantFundingDeployer.deploy();
    });

        it("creates a new grant successfully", async () => {
            await token.approve(grantFunding.address, ethers.utils.parseEther("10"));

    });

        it("removes grant", async () => {

    });

        it("claims grant successfully", async () => {

    });
});
