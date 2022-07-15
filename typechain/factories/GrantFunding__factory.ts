/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { GrantFunding } from "../GrantFunding";

export class GrantFunding__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GrantFunding> {
    return super.deploy(overrides || {}) as Promise<GrantFunding>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): GrantFunding {
    return super.attach(address) as GrantFunding;
  }
  connect(signer: Signer): GrantFunding__factory {
    return super.connect(signer) as GrantFunding__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GrantFunding {
    return new Contract(address, _abi, signerOrProvider) as GrantFunding;
  }
}

const _abi = [
  {
    inputs: [],
    name: "FailedERC20Transfer",
    type: "error",
  },
  {
    inputs: [],
    name: "GrantNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "GrantPreviouslyClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "secondsRemaining",
        type: "uint256",
      },
    ],
    name: "NotYetClaimable",
    type: "error",
  },
  {
    inputs: [],
    name: "PreviouslyGranted",
    type: "error",
  },
  {
    inputs: [],
    name: "UnlockTimeInvalid",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "GrantClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "GrantRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "originalTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTime",
        type: "uint256",
      },
    ],
    name: "GrantUnlockAltered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockAtTime",
        type: "uint256",
      },
    ],
    name: "NewGrantCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funder",
        type: "address",
      },
    ],
    name: "claimGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountOfERC20Tokens",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "unlockAtTime",
        type: "uint256",
      },
    ],
    name: "createNewGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "removeGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c05806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630c52742c14610046578063267406cb14610062578063cff106b31461007e575b600080fd5b610060600480360381019061005b91906108fd565b61009a565b005b61007c60048036038101906100779190610964565b610371565b005b61009860048036038101906100939190610964565b61059f565b005b6000429050808210156100e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100d9906109ee565b60405180910390fd5b8082101561011c576040517f40ab32fc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060040160009054906101000a900460ff161580156101be575060008160020154115b156101f5576040517fe247db4900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b815260040161023493929190610a2c565b6020604051808303816000875af1158015610253573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102779190610a9b565b9050806102b0576040517f4102d58e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b868260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085826001018190555082826002018190555083826003018190555060008260040160006101000a81548160ff0219169083151502179055507f58d2772956e8110bfa4226db80bdc3d1d529bca6008ec3de2b666b09ece53e05878688876040516103609493929190610ac8565b60405180910390a150505050505050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160020154141561042f576040517f7b8ca8ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060040160009054906101000a900460ff1615610478576040517ff7008bca00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8484600101546040518363ffffffff1660e01b81526004016104dd929190610b0d565b6020604051808303816000875af11580156104fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105209190610a9b565b905080610559576040517f4102d58e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082600201819055507f373b20cfd3898bd762d3a804c3183db6dfb7bb947738958d21de4f066615928b836040516105929190610b36565b60405180910390a1505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160020154141561065d576040517f7b8ca8ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060040160009054906101000a900460ff16156106a6576040517ff7008bca00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b42816003015411156106fe574281600301546106c29190610b80565b6040517fe6b2af550000000000000000000000000000000000000000000000000000000081526004016106f59190610bb4565b60405180910390fd5b60008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3384600101546040518363ffffffff1660e01b8152600401610763929190610b0d565b6020604051808303816000875af1158015610782573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a69190610a9b565b9050806107df576040517f4102d58e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018260040160006101000a81548160ff0219169083151502179055507f09c8eaa412e20939eaf9b500cf254a3d63c53b8c06d329641c68326cffa39d81838360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846001015460405161085793929190610a2c565b60405180910390a1505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061089482610869565b9050919050565b6108a481610889565b81146108af57600080fd5b50565b6000813590506108c18161089b565b92915050565b6000819050919050565b6108da816108c7565b81146108e557600080fd5b50565b6000813590506108f7816108d1565b92915050565b6000806000806080858703121561091757610916610864565b5b6000610925878288016108b2565b9450506020610936878288016108e8565b9350506040610947878288016108b2565b9250506060610958878288016108e8565b91505092959194509250565b60006020828403121561097a57610979610864565b5b6000610988848285016108b2565b91505092915050565b600082825260208201905092915050565b7f496e76616c696420756e6c6f636b2074696d6500000000000000000000000000600082015250565b60006109d8601383610991565b91506109e3826109a2565b602082019050919050565b60006020820190508181036000830152610a07816109cb565b9050919050565b610a1781610889565b82525050565b610a26816108c7565b82525050565b6000606082019050610a416000830186610a0e565b610a4e6020830185610a0e565b610a5b6040830184610a1d565b949350505050565b60008115159050919050565b610a7881610a63565b8114610a8357600080fd5b50565b600081519050610a9581610a6f565b92915050565b600060208284031215610ab157610ab0610864565b5b6000610abf84828501610a86565b91505092915050565b6000608082019050610add6000830187610a0e565b610aea6020830186610a0e565b610af76040830185610a1d565b610b046060830184610a1d565b95945050505050565b6000604082019050610b226000830185610a0e565b610b2f6020830184610a1d565b9392505050565b6000602082019050610b4b6000830184610a0e565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610b8b826108c7565b9150610b96836108c7565b925082821015610ba957610ba8610b51565b5b828203905092915050565b6000602082019050610bc96000830184610a1d565b9291505056fea26469706673582212207b8adc6d6c7118084db79710960b3a9d2f84e561500fd8958a09575ec4d3f55e64736f6c634300080a0033";
