import { expect } from "chai";
import { ethers, waffle } from "hardhat";
// import { ERC20 } from "../typechain/ERC20";
// import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ERC20 } from "../typechain/ERC20";
import { GrantFunding } from "../typechain/GrantFunding";

const { provider } = waffle;

describe("GrantFunding", function () {

    let token: ERC20;
    let grantFunding: GrantFunding;
    const [wallet] = provider.getWallets();
    let signers: SignerWithAddress[];
    
    before(async function () {
        signers = await ethers.getSigners();
    });

    it("creates a new grant successfully", async () => {

    });

    it("removes grant", async () => {

    });

    it("claims grant successfully", async () => {

    });
});
