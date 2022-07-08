import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: false,
            runs: 7500,
          },
        },
      },
      {
        version: "0.8.10"
      },
    ]
  },
  mocha: { timeout: 0 },
  networks: {
    hardhat: {
      gas: 12000000,
      gasPrice: 10000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    }
  },
};

export default config;
