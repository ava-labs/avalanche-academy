# Custom Avalanche L1 with USDC as the Gas Payment and Cross-Chain Bridging

## Replicate This PWA for Your L1
To replicate this PWA for your custom L1, update these constants in [constants.tsx](./src/utils/constants.tsx):
- TOKEN_USDC
- TOKEN_HOME
- TOKEN_REMOTE
- L1_BLOCKCHAIN_ID

```bash
yarn install --frozen-lockfile
yarn start
```

# Quick Start
After Building a New Avalanche L1, follow [this use case](./TEST.md) to get started.


## How to Build a New Avalanche L1
This demo is about building your own L1 on the Avalanche Local Network run by the CLI; but can be applied to the Avalanche Fuji Testnet and Mainnet directly; which will require you to run your own VPS and setting up your Node and Validator.

Follow the detailed instructions [here](https://github.com/miladtsx/avalanche-starter-kit/blob/main/src/11-erc20-to-native-interchain-token-transfer/_INSTRUCTIONS.md).


### Example Scenario
I sent 1 Circle $USDC to the L1. The recipient then returned 0.99 $USDC to Fuji-CChain, as part of it was used for gas fees on the L1.

[Check out this transaction](./EXAMPLE_TX.md) for more details.

## What is an Avalanche L1?
An Avalanche L1 is a custom blockchain with its own rules for membership, token economics, and transaction execution. It operates with a subset of Avalanche validators working together to reach consensus. These validators can participate in multiple L1s, ensuring scalability and flexibility.

The custom L1 I built can receive Circle $USDC as the native coin to pay gas.

[Learn more about Avalanche L1s](https://academy.avax.network/course/avalanche-fundamentals/03-multi-chain-architecture-intro/02-subnet).

## PWA App Overview
This app is a Progressive Web Application (PWA) that lets you test full L1 blockchain integration with the Fuji-CChain. (It offers offline functionality, push notifications, and installation capabilities.) served by github pages.

### Current Features:
- Shows balance of the native and erc20 token on both supported network. (Fuji ERC20-> L1 Native).
- Bridging functionality:
  - Bridge Circle $USDC to the L1 and receive the native coin.
  - Bridge the L1 native coin back to Fuji-CChain and receive Circle $USDC.
- [OnRamp](https://github.com/miladtsx/avalanche_custom_blockchain/compare/main...onramp) (but it is not practically functional because there is no support for FUJI)

### Security
Strict one-time approvals mean user funds are not at risk of smart contract allowance exploits.

#### Why the Two USDCs?
There’s only one official Circle [$USDC](0x5425890298aed601595a70AB815c96711a31Bc65). In this app, you bridge Circle $USDC (ERC20) to the custom L1, where it represents the native coin. I named the L1’s native coin “USDC” to reflect its 1:1 mapping with Circle’s $USDC. This coin is used for gas payments on the L1.

You can customize the native coin’s name when building your own L1 and of course use any other Token than Circle $USDC.