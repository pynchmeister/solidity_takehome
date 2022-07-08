/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { ERC20 } from "../ERC20";

export class ERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC20>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620012f1380380620012f18339818101604052810190620000379190620003a2565b81600090805190602001906200004f92919062000155565b5080600190805190602001906200006892919062000155565b506012600260006101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050506200048c565b828054620001639062000456565b90600052602060002090601f016020900481019282620001875760008555620001d3565b82601f10620001a257805160ff1916838001178555620001d3565b82800160010185558215620001d3579182015b82811115620001d2578251825591602001919060010190620001b5565b5b509050620001e29190620001e6565b5090565b5b8082111562000201576000816000905550600101620001e7565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200026e8262000223565b810181811067ffffffffffffffff8211171562000290576200028f62000234565b5b80604052505050565b6000620002a562000205565b9050620002b3828262000263565b919050565b600067ffffffffffffffff821115620002d657620002d562000234565b5b620002e18262000223565b9050602081019050919050565b60005b838110156200030e578082015181840152602081019050620002f1565b838111156200031e576000848401525b50505050565b60006200033b6200033584620002b8565b62000299565b9050828152602081018484840111156200035a57620003596200021e565b5b62000367848285620002ee565b509392505050565b600082601f83011262000387576200038662000219565b5b81516200039984826020860162000324565b91505092915050565b60008060408385031215620003bc57620003bb6200020f565b5b600083015167ffffffffffffffff811115620003dd57620003dc62000214565b5b620003eb858286016200036f565b925050602083015167ffffffffffffffff8111156200040f576200040e62000214565b5b6200041d858286016200036f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200046f57607f821691505b6020821081141562000486576200048562000427565b5b50919050565b610e55806200049c6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461015d57806370a082311461017957806395d89b41146101a9578063a9059cbb146101c7578063dd62ed3e146101f75761009e565b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100f157806323b872dd1461010f578063313ce5671461013f575b600080fd5b6100ab610227565b6040516100b891906109db565b60405180910390f35b6100db60048036038101906100d69190610a96565b6102b5565b6040516100e89190610af1565b60405180910390f35b6100f96103a7565b6040516101069190610b1b565b60405180910390f35b61012960048036038101906101249190610b36565b6103ad565b6040516101369190610af1565b60405180910390f35b610147610730565b6040516101549190610ba5565b60405180910390f35b61017760048036038101906101729190610a96565b610743565b005b610193600480360381019061018e9190610bc0565b610751565b6040516101a09190610b1b565b60405180910390f35b6101b1610769565b6040516101be91906109db565b60405180910390f35b6101e160048036038101906101dc9190610a96565b6107f7565b6040516101ee9190610af1565b60405180910390f35b610211600480360381019061020c9190610bed565b61080c565b60405161021e9190610b1b565b60405180910390f35b6000805461023490610c5c565b80601f016020809104026020016040519081016040528092919081815260200182805461026090610c5c565b80156102ad5780601f10610282576101008083540402835291602001916102ad565b820191906000526020600020905b81548152906001019060200180831161029057829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103959190610b1b565b60405180910390a36001905092915050565b60035481565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042c90610cda565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146105e2576000600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146105e05783811015610553576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054a90610d46565b60405180910390fd5b838161055f9190610d95565b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505b82816105ee9190610d95565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555082600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461067c9190610dc9565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161071c9190610b1b565b60405180910390a360019150509392505050565b600260009054906101000a900460ff1681565b61074d8282610831565b5050565b60046020528060005260406000206000915090505481565b6001805461077690610c5c565b80601f01602080910402602001604051908101604052809291908181526020018280546107a290610c5c565b80156107ef5780601f106107c4576101008083540402835291602001916107ef565b820191906000526020600020905b8154815290600101906020018083116107d257829003601f168201915b505050505081565b60006108043384846103ad565b905092915050565b6005602052816000526040600020602052806000526040600020600091509150505481565b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461087c9190610dc9565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600360008282546108d19190610dc9565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516109369190610b1b565b60405180910390a35050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561097c578082015181840152602081019050610961565b8381111561098b576000848401525b50505050565b6000601f19601f8301169050919050565b60006109ad82610942565b6109b7818561094d565b93506109c781856020860161095e565b6109d081610991565b840191505092915050565b600060208201905081810360008301526109f581846109a2565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a2d82610a02565b9050919050565b610a3d81610a22565b8114610a4857600080fd5b50565b600081359050610a5a81610a34565b92915050565b6000819050919050565b610a7381610a60565b8114610a7e57600080fd5b50565b600081359050610a9081610a6a565b92915050565b60008060408385031215610aad57610aac6109fd565b5b6000610abb85828601610a4b565b9250506020610acc85828601610a81565b9150509250929050565b60008115159050919050565b610aeb81610ad6565b82525050565b6000602082019050610b066000830184610ae2565b92915050565b610b1581610a60565b82525050565b6000602082019050610b306000830184610b0c565b92915050565b600080600060608486031215610b4f57610b4e6109fd565b5b6000610b5d86828701610a4b565b9350506020610b6e86828701610a4b565b9250506040610b7f86828701610a81565b9150509250925092565b600060ff82169050919050565b610b9f81610b89565b82525050565b6000602082019050610bba6000830184610b96565b92915050565b600060208284031215610bd657610bd56109fd565b5b6000610be484828501610a4b565b91505092915050565b60008060408385031215610c0457610c036109fd565b5b6000610c1285828601610a4b565b9250506020610c2385828601610a4b565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c7457607f821691505b60208210811415610c8857610c87610c2d565b5b50919050565b7f45524332303a20696e73756666696369656e742d62616c616e63650000000000600082015250565b6000610cc4601b8361094d565b9150610ccf82610c8e565b602082019050919050565b60006020820190508181036000830152610cf381610cb7565b9050919050565b7f45524332303a20696e73756666696369656e742d616c6c6f77616e6365000000600082015250565b6000610d30601d8361094d565b9150610d3b82610cfa565b602082019050919050565b60006020820190508181036000830152610d5f81610d23565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610da082610a60565b9150610dab83610a60565b925082821015610dbe57610dbd610d66565b5b828203905092915050565b6000610dd482610a60565b9150610ddf83610a60565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e1457610e13610d66565b5b82820190509291505056fea26469706673582212202d80b41eb4a587a83cb33d9b4248fd551fe80f34424ce6a21080f89ddbd3502d64736f6c634300080a0033";
