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
    inputs: [
      {
        internalType: "address",
        name: "grantLocation",
        type: "address",
      },
    ],
    name: "claimGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060fb8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063cff106b314602d575b600080fd5b60436004803603810190603f9190605b565b6045565b005b50565b60008135905060558160b1565b92915050565b600060208284031215606c57600080fd5b60006078848285016048565b91505092915050565b6000608a826091565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60b8816081565b811460c257600080fd5b5056fea2646970667358221220d7bdbaee82225a6ed2b62ecdbaeb30504bfd7c21f574a0d1a631263a3fa8f2db64736f6c63430008000033";
