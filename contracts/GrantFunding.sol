pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GrantFunding {
    using Counters for Counters.Counter;

    // this may need to be switched to a struct: http://ethereum.stackexchange.com/questions/41466/ddg#64912


    ////////////////////// STRUCTS /////////////////////////////

    struct Grant {
        address token;
        uint256 amount;
        uint256 start;
        uint256 unlockAt;
        bool claimed;
    }

    ////////////////////// EVENTS /////////////////////////////
    event NewGrantCreated();

    event GrantRemoved();

    event GrantClaimed();



    ////////////////////// FUNCTIONS /////////////////////////////

    function createNewGrants(uint256 amountOfERC20Tokens, address recipient) internal returns (uint unlockTimestamp, address grantLocation) {
        // TODO

        emit NewGrantCreated();
    } 

    function removeGrant(address grantLocation) internal {
        // @info ensure the recipient hasn't unlocked collection  

        // TODO
        emit GrantRemoved();

    }

    function claimGrant(address grantLocation) external {
        // @info recipient must claim a grant after the unlock timestamp
        // reverts if before unlock timestamp

        // TODO: transfer funds out of contract 

        emit GrantClaimed();
    }
}