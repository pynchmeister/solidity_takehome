pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GrantFunding {
    using Counters for Counters.Counter;

    ////////////////////// STRUCTS /////////////////////////////

    struct Grant {
        address token;
        uint256 amount;
        uint256 start;
        uint256 unlockAt;
        bool claimed;
    }


    ////////////////////// MAPPINGS /////////////////////////////

    mapping(address => mapping(address => Grant)) grants;

    ////////////////////// CUSTOM ERRORS /////////////////////////////

    // @TODO refer to this article to put a bow on custom errors: https://blog.soliditylang.org/2021/04/21/custom-errors/
    
    error GrantPreviouslyClaimed();
    error PreviouslyGranted();
    error NotYetClaimable(uint256 secondsRemaining);
    error UnlockTimeInvalid();
    error FailedERC20Transfer();
    error GrantNotFound();


    ////////////////////// EVENTS /////////////////////////////
    event NewGrantCreated(
        address token,
        address recipient,
        uint256 amount,
        uint256 unlockAtTime
    );

    event GrantRemoved(address recipient);

    event GrantClaimed(address funder, address token, uint256 amount);

    event GrantUnlockAltered(address recipient, uint256 originalTime, uint256 newTime);

    ////////////////////// FUNCTIONS /////////////////////////////

    // @dev may be able to remove 'address token'
    // @dev may need to change function visibility 
    function createNewGrant(
        address token, 
        uint256 amountOfERC20Tokens, 
        address recipient,
        uint256 unlockAtTime
        // ) external returns (uint unlockTimestamp, address grantLocation) {
           ) external {
            uint256 start = block.timestamp;
            require(unlockAtTime >= start, "Invalid unlock time");
            if (unlockAtTime < start) {
                revert UnlockTimeInvalid();
            }
            Grant storage grant = grants[msg.sender][recipient];

            if(!grant.claimed && grant.start > 0) {
                revert PreviouslyGranted();
            }

            bool success = IERC20(token).transferFrom(
                msg.sender,
                address(this),
                unlockAtTime
            );

            if (!success) {
                revert FailedERC20Transfer();
            }

            grant.token = token;
            grant.amount = amountOfERC20Tokens;
            grant.start = start;
            grant.unlockAt = unlockAtTime;
            grant.claimed = false;

            emit NewGrantCreated(token, recipient, amountOfERC20Tokens, unlockAtTime);
            }
            

    function removeGrant(address recipient) external {
        // @TODO justify the use of external keyword
        // @info ensure the recipient hasn't unlocked collection  
        Grant storage grant = grants[msg.sender][recipient];
        if (grant.start == 0) {
            revert GrantNotFound();
        }
        if (grant.claimed) {
            revert GrantPreviouslyClaimed();
        }
        bool success = IERC20(grant.token).transfer(recipient, grant.amount);
        if (!success) {
            revert FailedERC20Transfer();
        }

        grant.start = 0;
        emit GrantRemoved(recipient);
    }

    function claimGrant(address funder) external {
        // @info recipient must claim a grant after the unlock timestamp
        // reverts if before unlock timestamp
        // TODO: transfer funds out of contract 
        Grant storage grant = grants[funder][msg.sender];
        if (grant.start == 0) {
            revert GrantNotFound();
        }
        if (grant.claimed) {
            revert GrantPreviouslyClaimed();
        }
        if (grant.unlockAt > block.timestamp) {
            revert NotYetClaimable(grant.unlockAt - block.timestamp);
        }

        bool success  = IERC20(grant.token).transfer(msg.sender, grant.amount);
        if (!success) {
            revert FailedERC20Transfer();
        }
        
        grant.claimed = true;
        emit GrantClaimed(funder, grant.token, grant.amount);
    }

    // // @TODO: allows an address (when approved to claim a grant on behalf of the grant creator)
    // function claimGrantOnBehalfOf(address claimer, address funder) external {

// claim or release on behalf of someone else 
//adding access control (function tied to (msg.sender)
    // } 
}
