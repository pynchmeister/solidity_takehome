pragma solidity ^0.8.0;

contract GrantFunding {

    function createNewGrants(uint256 amountOfERC20Tokens, address recipient) internal returns (uint unlockTimestamp, address grantLocation) {
        // TODO
    } 

    function removeGrant(address grantLocation) internal {
        // @info ensure the recipient hasn't unlocked collection  

        // TODO

    }

    function claimGrant(address grantLocation) external {
        // @info recipient must claim a grant after the unlock timestamp
        // reverts if before unlock timestamp

        // TODO: transfer funds out of contract 
    }


}