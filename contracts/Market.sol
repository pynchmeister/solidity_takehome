pragma solidity ^0.8.0;

import "./ERC20.sol";

// This yield farm accepts token deposits for integrators
// and takes a small fee which is claimable from farming profits
contract Market is ERC20 {

    address owner;
    mapping(address => bool) poolRegistration;
    mapping(bytes32 => bool) usedSignatures;

    constructor () ERC20("Market token", "MT") {
        owner = msg.sender;
    }

    function deposit(address pool, address token, uint256 amount) external payable {
        // Only registered safe pools
        require(poolRegistration[pool]);
        require(msg.value == 0.1 ether);
        // A fee for our managed yield farm
        _mint(msg.sender, 0.1 ether);
        // Transfer the tokens to this contract
        ERC20(token).transferFrom(msg.sender, address(this), amount);
        // Call the fund management contract to enact the strategy
        (bool success, ) = pool.delegatecall(abi.encodeWithSignature(
            "tokenDeposit(address, address, uint256)", 
            msg.sender,
            token,
            amount));
        require(success, "deposit fail");
    }

    function withdraw(uint256 lpTokens, address pool, address token, uint256 amount) external {
        // We call the pool to collect profits for us
        (bool success, ) = pool.delegatecall(abi.encodeWithSignature(
            "withdraw(address, address)", msg.sender, token));
        require(success, "withdraw failed");
        ERC20(token).transfer(msg.sender, amount);
        // Transfer them the contract excess value
        uint256 distributable = address(this).balance - (totalSupply*0.1 ether)/1e18;
        uint256 userShare = (distributable*lpTokens)/totalSupply;
        // Burn the LP tokens
        _burn(msg.sender, lpTokens);
        payable(msg.sender).transfer(userShare);
    }

    // This extends our erc20 to allow signed lp token transfers
    function signedTransfer(address src, address dest, uint256 amount, bytes32 extraData, bytes32 r, bytes32 s, uint8 v) external {
        bytes32 sigHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", uint256(32), keccak256(abi.encodePacked(src, dest, amount, extraData))));
        require(src == ecrecover(sigHash, v, r, s), "invalid sig");
        require(!usedSignatures[sigHash], "replayed");
        balanceOf[src] -= amount;
        balanceOf[dest] += amount;
    }

    // Prevents anyone who is not the owner and contracts from
    // calling this contract
    modifier onlyOwner(){
        require(msg.sender == owner || msg.sender != tx.origin);
        _;
    }

    function registerPool(address pool) external onlyOwner() {
        // We want to scan pool's code for self destruct to ensure the
        // contract can't be destroyed
        bytes memory o_code;
        uint256 size;
        // From solidity docs
        assembly {
            // retrieve the size of the code, this needs assembly
            size := extcodesize(pool)
            // allocate output byte array - this could also be done without assembly
            // by using o_code = new bytes(size)
            o_code := mload(0x40)
            // new "memory end" including padding
            mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // store length in memory
            mstore(o_code, size)
            // actually retrieve the code, this needs assembly
            extcodecopy(pool, add(o_code, 0x20), 0, size)
        }

        require(size != 0, "un-deployed contract");

        for (uint256 i; i < o_code.length; i ++) {
            uint8 opcode = uint8(o_code[i]);
            require(
                // self destruct
                opcode != 0xff,

            "Forbidden code");
        }

        poolRegistration[pool] = true;
    }

    function claimProfits() onlyOwner external {
        payable(msg.sender).transfer(address(this).balance);
    }
}

/*
 Security Vulernabilities: Market.sol

 (Using Slither)

 * Market.deposit(address,address,uint256) (contracts/Market.sol#17-32) uses delegatecall to a input-controlled function id
        - (success) = pool.delegatecall(abi.encodeWithSignature(tokenDeposit(address, address, uint256),msg.sender,token,amount)) (contracts/Market.sol#26-30)
 * Market.withdraw(uint256,address,address,uint256) (contracts/Market.sol#34-46) uses delegatecall to a input-controlled function id
        - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#controlled-delegatecall


 * Market.deposit(address,address,uint256) (contracts/Market.sol#17-32) ignores return value by ERC20(token).transferFrom(msg.sender,address(this),amount) (contracts/Market.sol#24)
 * Market.withdraw(uint256,address,address,uint256) (contracts/Market.sol#34-46) ignores return value by ERC20(token).transfer(msg.sender,amount) (contracts/Market.sol#39)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unchecked-transfer

 * Market.usedSignatures (contracts/Market.sol#11) is never initialized. It is used in:
        - Market.signedTransfer(address,address,uint256,bytes32,bytes32,bytes32,uint8) (contracts/Market.sol#49-55)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#uninitialized-state-variables
//

 * Market.deposit(address,address,uint256).token (contracts/Market.sol#17) lacks a zero-check on :
                - (success) = pool.delegatecall(abi.encodeWithSignature(tokenDeposit(address, address, uint256),msg.sender,token,amount)) (contracts/Market.sol#26-30)
 * Market.withdraw(uint256,address,address,uint256).pool (contracts/Market.sol#34) lacks a zero-check on :
                - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
 * Market.withdraw(uint256,address,address,uint256).token (contracts/Market.sol#34) lacks a zero-check on :
                - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#missing-zero-address-validation

* Reentrancy in Market.withdraw(uint256,address,address,uint256) (contracts/Market.sol#34-46):
        External calls:
        - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
        - ERC20(token).transfer(msg.sender,amount) (contracts/Market.sol#39)
        State variables written after the call(s):
        - _burn(msg.sender,lpTokens) (contracts/Market.sol#44)
                - balanceOf[account] = balanceOf[account] - amount (contracts/ERC20.sol#128)
        - _burn(msg.sender,lpTokens) (contracts/Market.sol#44)
                - totalSupply -= amount (contracts/ERC20.sol#130)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2

* Reentrancy in Market.withdraw(uint256,address,address,uint256) (contracts/Market.sol#34-46):
        External calls:
        - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
        - ERC20(token).transfer(msg.sender,amount) (contracts/Market.sol#39)
        Event emitted after the call(s):
        - Transfer(account,address(0),amount) (contracts/ERC20.sol#132)
                - _burn(msg.sender,lpTokens) (contracts/Market.sol#44)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3

* Market.registerPool(address) (contracts/Market.sol#64-96) uses assembly
        - INLINE ASM (contracts/Market.sol#70-82)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#assembly-usage

ERC20._setupDecimals(uint8) (contracts/ERC20.sol#154-157) is never used and should be removed
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#dead-code

Pragma version^0.8.0 (contracts/ERC20.sol#3) allows old versions
Pragma version^0.8.0 (contracts/Market.sol#1) allows old versions
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity

* Low level call in Market.deposit(address,address,uint256) (contracts/Market.sol#17-32):
        - (success) = pool.delegatecall(abi.encodeWithSignature(tokenDeposit(address, address, uint256),msg.sender,token,amount)) (contracts/Market.sol#26-30)
Low level call in Market.withdraw(uint256,address,address,uint256) (contracts/Market.sol#34-46):
        - (success) = pool.delegatecall(abi.encodeWithSignature(withdraw(address, address),msg.sender,token)) (contracts/Market.sol#36-37)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls

* transfer(address,uint256) should be declared external:
        - ERC20.transfer(address,uint256) (contracts/ERC20.sol#56-63)
mint(address,uint256) should be declared external:
        - ERC20.mint(address,uint256) (contracts/ERC20.sol#106-108)
approve(address,uint256) should be declared external:
        - ERC20.approve(address,uint256) (contracts/ERC20.sol#140-150)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external
*/