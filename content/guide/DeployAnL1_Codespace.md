---
title: Deploying a Distributed EVM Layer 1 Blockchain using Avalanche, Docker, and GitHub Codespaces
description: We are going to be walking through how to deploy our own test blockchain with 5 nodes, with our own token. We'll also showcase how to deploy a simple smart contract on this newly created blockchain. We will be using the Avalanche Start Kit repo, Docker, and Github Codespaces to run this project -- meaning you don't have to install anything :)
date: 2024-07-29
authors: [usmaneth]
topics: [Avalanche Basics]
---

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kqq5i2iyiaa5zp6q2ak8.jpeg)

In the last few years, as developers we've witnessed a surge in platforms offering diverse execution environments for smart contracts across the blockchain landscape. Lots of cool new chains launching with different systems for building blockchain based applications. While there are large numbers of new networks releasing, the current landscape primarily consists of two approaches:

1. High performance single shared state environments where multiple applications coexist on the same blockchain.
2. Individual layer 2 application-specific blockchains that settle to another blockchain network, typically run using a single sequencer (essentially, one node).

One of the most powerful alternatives to all this, is launching your own high performance blockchain where you own everything from full control of your validators, to what virtual machine, how permissionless or permissioned, etc. This can only be done by deploying your own Layer 1 blockchain network that has very few rules associated with it. 

For the sake of today's tutorial, we will be utilizing Avalanche, which specializes in deploying fully customizable layer 1 blockchain networks running on top of a scalable and fast consensus mechanism (true finality in under 2s). 

We are going to be walking through how to deploy our own test blockchain with 5 nodes, with our own token. We'll also showcase how to deploy a simple smart contract on this newly created blockchain. 

We will be using the Avalanche Start Kit repo, Docker, and Github Codespaces to run this project -- meaning you don't have to install anything :) 

(Of course, you have full ability to install the starter kit on your local machine and execute everything with Docker from there as well. For sake of simple testing, we will be using Codespaces for this tutorial.) 


**Step 1: Setting Up the Environment**

- Navigate to the [Avalanche Starter Kit repository](https://github.com/ava-labs/avalanche-starter-kit)
- Locate the green "Code" button and click "Open with Codespaces"
- This action will open a separate tab that launches the project in a GitHub Codespace and automatically runs Docker

- To verify that everything is working correctly, run the following command in the terminal:
`avalanche -h
`
If everything is set up correctly, you should see the Avalanche CLI help output: 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ihcj46c7xzqzvpixpkp2.png)


**Step 2: Creating Your Custom Blockchain Network**

Now that our environment is set up, let's dive into creating our custom blockchain network. We'll use the Avalanche CLI tool to create a layer 1 blockchain network.

(At the time of writing this tutorial - Avalanche still employs the term "subnet", which is Avalanche's term for a custom blockchain network. Soon this will change to "Layer 1" - Be mindful of this when entering these commands.)

We're going to start with creating our blockchain network using the 'create' command: 

- Run the following command:
`avalanche subnet create {blockchainName}`

This command initiates the subnet creation wizard. Let's break down each step:

**VM Selection:**
`✔ Subnet-EVM`
We're choosing the Subnet-EVM (Ethereum Virtual Machine), which allows our blockchain to be compatible with Ethereum smart contracts and tools.

**VM Version:**
`✔ Use latest release version`
This ensures we're using the most up-to-date version of the Subnet-EVM.

**Cross Chain Communication:**
Will also ask if you would like to enable Teleporter. This is Avalanche's EVM-EVM cross chain communication protocol. Highly recommend to run this if you are planning on testing multiple blockchains and sending transactions between them. 

**Chain ID:**
`ChainId: {}`
Enter your subnet's ChainId. It can be any positive integer - the Chain ID is a unique identifier for your blockchain. It's crucial for preventing replay attacks and for wallet interactions.

**Token Symbol:**
Select a symbol for your subnet's native token
`Token symbol: {}`
This defines the ticker for your blockchain's native token, which will be used for gas fees and transactions.

**Gas Configuration:**
`✔ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)`
This setting determines the computational capacity of your blockchain. We're using the C-Chain's setting for this example, but you can customize this based on your needs. You can also go high usage and bump up the power of your system. 

**Airdrop:**
`✔ Airdrop 1 million tokens to the default ewoq address (do not use in production)`
This allocates initial tokens to a test address for development purposes.
`
After completing these steps, you should see output similar to this:

`✓ Successfully created subnet configuration`

Here is what my terminal looks like now that we got through the setup process: 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yvvump0x9rvs675xd75z.png)


This process creates two important configuration files:

`genesis.json`: Defines the initial state of your blockchain
`sidecar.json`: Contains metadata about your subnet

These files are stored in `~/.avalanche-cli/subnets/<subnetName>`.

**Step 3: Deploying Your Subnet**

Now that we've created our subnet configuration, it's time to deploy it to a local network. 

Type this command: 

`avalanche subnet deploy {blockchainName}`

When prompted, select "Local Network" as the deployment target.

After deployment, you'll see output containing important information about your new blockchain, including RPC URLs, node details, and connection information.

Here's what a successful deployment looks like: 
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zjb8ehxxkyni2xwaiz6i.png)

If yours looks like similarly, congratulations! You just deployed a full cross chain compatible EVM blockchain on Github Codespaces, running a 5 node network. That is no easy feat... but we are not done yet. 

**Step 4: Interacting with Your Blockchain**

Now that your blockchain is deployed, lets have some fun and interact with it using various tools... but first: 

Since the Avalanche Network is running in a Github Codespace - the localhost (127.0.0.1) will only be accessible from inside the Codespace. Connecting your wallet using the localhost RPC URL will not work, since your wallet will be running on your computer, and not the local environment where the network is running (the Codespace cloud).

So, we just need to make a small adjustment and make the RPC-Endpoint publicly accessible. Click on the little antenna icon in the bottom bar of the Codespace:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wt0dp47nyapglma0n1k2.png)

- There select the row with the port 9650 and right-click to open the port:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kfvaj8x1lgfpwmm6woq4.png)

- Now that it's publicly avaialble we can add it to a wallet like Core Wallet or MetaMask:

- Open [Core Wallet](https://core.app/): 

- Click the networks symbol in the corner and click "manage networks"

- Once there, click the + symbol. should birng up a screen like this: 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e9gelsdvttrd695gbfcc.png)

- Enter in the details from your blockchain deployment:

For example
Network Name: PaymentChain
RPC URL: (use the Codespace RPC URL from the deployment output)
Chain ID: 123
Currency Symbol: PAY

You should then be able to be connected to your newly deployed blockchain! 

Now lets also import the account that we selected to be funded with all the networks token (you can customize how this is done) 

On top of your Core wallet, click the current account and then in the corner there is a + - import from private key. then input the private key provided in your terminal after your blockchain had deployed. This should give you a fully funded account. 

Should look like this when done: 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8bmm2f8wt4rm6txwbli8.png)

Now we have just deployed our own 5 node blockchain network, deployed a EVM blockchain to it, connected to that network with a wallet, and custodied the network token. 

Now time to deploy a smart contract: 

**Step 5: Deploying a Smart Contract to Your New Blockchain**

Now that we have our custom blockchain up and running, let's deploy a smart contract to it. We'll create a simple calculator contract with four basic operations: addition, subtraction, multiplication, and division. Then, we'll deploy it using Remix and interact with it on our new blockchain.

_1. Writing the Smart Contract_

- First, let's write our calculator smart contract, using Remix IDE for this. Remix IDE (Integrated Development Environment) is a powerful, open-source tool for developing smart contracts on Ethereum-compatible blockchains.

- Open [Remix IDE ](https://remix.ethereum.org/)in your browser.
- Create a new file by clicking the "+" icon in the file explorer. 
- Name it `SimpleCalculator.sol.`
- Paste the following code into the file:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleCalculator {
    // Event to log calculations
    event Calculation(string operation, int256 a, int256 b, int256 result);

    function add(int256 a, int256 b) public returns (int256) {
        int256 result = a + b;
        emit Calculation("addition", a, b, result);
        return result;
    }

    function subtract(int256 a, int256 b) public returns (int256) {
        int256 result = a - b;
        emit Calculation("subtraction", a, b, result);
        return result;
    }

    function multiply(int256 a, int256 b) public returns (int256) {
        int256 result = a * b;
        emit Calculation("multiplication", a, b, result);
        return result;
    }

    function divide(int256 a, int256 b) public returns (int256) {
        require(b != 0, "Cannot divide by zero");
        int256 result = a / b;
        emit Calculation("division", a, b, result);
        return result;
    }
}
```

This contract includes four functions for basic arithmetic operations, where ach function emits an event logging the operation, inputs, and result, which will be useful for testing and monitoring.

_2. Compiling the Contract_

- In Remix, navigate to the "Solidity Compiler" tab (it looks like a "S" symbol).
- Ensure that the "Compiler" version is set to 0.8.0 or higher to match our pragma statement.
- Click "Compile SimpleCalculator.sol".
- You should see a green checkmark indicating successful compilation.

_3: Deploying the Contract_

Now, let's deploy our contract to our custom Avalanche blockchain:

- Switch to the "Deploy & Run Transactions" tab in Remix (it looks like a ">_" symbol).
- In the "Environment" dropdown, select "Injected Web3". This will prompt you to connect your wallet (Core Wallet or MetaMask) that you've set up with your custom blockchain.
- Ensure your wallet is connected to your custom Avalanche blockchain. You should see your account address and balance in Remix.
- Under "Contract", select "SimpleCalculator" from the dropdown.
- Click "Deploy". Your wallet will prompt you to confirm the transaction. Approve it to deploy the contract.
- Once deployed, you'll see the contract appear under "Deployed Contracts" in Remix.

_Step 4: Interacting with the Contract_

Now that our contract is deployed, let's test each function:

- Expand the deployed contract in Remix.
- You'll see input fields for each function: add, subtract, multiply, and divide.

Let's test the add function:

- Enter 5 in the first input field and 3 in the second.
- Click "transact".
- Your wallet will prompt you to confirm the transaction. Approve it.
- Look at the Remix console. You should see the transaction details and the emitted event showing the result (8).

Here is what a successful operation looks like: 


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ezpl6dchxq8mw3e5ml0e.png)


Repeat this process for the other functions:

- Subtract: 10 and 4 (should return 6)
- Multiply: 7 and 6 (should return 42)
- Divide: 20 and 5 (should return 4)


Try dividing by zero (e.g., 5 and 0) to test the error handling in the divide function.

_Understanding the Process_

Let's break down what's happening here:

- Smart Contract Deployment: When we deploy the contract, we're actually sending a special transaction to our custom blockchain. This transaction includes the bytecode of our compiled contract. The blockchain then allocates an address for this contract, which is where the contract "lives" on the blockchain.
- Function Calls: Each time we call a function (like add or multiply), we're sending a transaction to the contract's address. This transaction includes data that specifies which function to call and what parameters to use.
- Gas Fees: Notice that each transaction requires a small amount of your custom token as a gas fee. This is because each operation on the blockchain requires computational resources, and gas is the mechanism for allocating these resources fairly.
- Events: The Calculation event we defined in the contract is emitted with each function call. These events are stored in the transaction logs and can be easily queried, making them useful for tracking contract activity off-chain.
- State Changes: Although our calculator doesn't store any state, more complex contracts often do. Any state changes would be permanently recorded on the blockchain as part of the transaction.

**Conclusion**

Congratulations! If you made it to the end, you've now deployed a functional  custom blockchain, running atop a 5 node network. You also deployed a application to that newly created network which demonstrated the basics of smart contract interaction: deploying contracts, calling functions, handling errors, and emitting events.

Now a door of unlimited possibilites is open; build your own blockchain, however you want. 

If you want to learn more about Avalanche and deep dive into custom blockchain development, check out the [Avalanche Academy.](https://academy.avax.network) 
