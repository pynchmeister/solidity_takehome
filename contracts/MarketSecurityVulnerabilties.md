# Market.sol Security Vulnerabilities 

## Note: Many of these were obtained using Slither; if more time was available I would have leveraged Mythril, Echidna, and more 

### High Severity

1. Market deposit and withdraw uses a 'controlled-delegatecall'
2. Market despoit and withdraw uses an 'unchecked-transfer': The return value of an external transfer/transferFrom call is not checked
3. Market.usedSignatures is never initialized; 'uninitalized state variables'.

### Low Severity 

4. Market deposit & withdraw missing zero addrress validation
5. Reentrancy vulnerabilities on Market.withdraw lines 34-36




