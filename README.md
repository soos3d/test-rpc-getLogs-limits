# Test rpc getLogs limits

 This tool runs a series of `eth_getLogs` requests to find out how many blocks in the past an RPC endpoint can handle. Compatible with EVM based chains.

## Project details

This program uses the `web3.js` library to retrieve logs based on the user configuration in the `index.js` file. The `main function` runs a loop based on the configuration. 

This project is compatible with EVM-based chains; the purpose is to have a systematic way to test the resilience of an RPC endpoint by making increasingly heavy `eth_getLogs` calls.

Project's structure:

```sh
    ├── index.js
    │── src
    │   ├── testLogs.js
    │ 
    ├── utils
    │   ├── getSize.js
    │   
    │   
    ├──.env
    ├── package.json
    └── README.md
```

## Quickstart

### Prerequisites

The system requires at least:

* Node.js v16.17.0— [install node](https://nodejs.org/en/download/)

### Clone this project

```sh
git clone https://github.com/soos3d/test-rpc-getLogs-limits.git
```

### Install Dependencies

From the root directory of the project run:

```sh
npm ci
```

> Use `npm ci` to launch a `clean install` of the dependencies, this will install the same version as in the `package.json` file.

### Edit .env.sample

Edit the `.env.sample` file, paste the node endpoint that you wish to test, and rename it to `.env`.

```sh
EVM_NODE_URL="NODE_URL_TO_TEST"
```

### Edit the configuration in index.js

`index.js` holds the configuration parameters. Edit them to your liking:

```js
    // Max limit of blocks in the past
    const blocks = 1100

    // Starting point
    let testedBlocks = 0

    // Blocks increment, each loop add 100 blocks to the getLogs query
    const increment = 100

    // Address to get logs from
    const address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" // WAVAX
```

The default configuration tests the endpoint by retrieving logs from up to 1000 blocks in the past (from the latest block). It starts from 0, and each loop increases the range by 100 blocks.

It will then print a success message with the time required and the approximate amount of data retrieved.

> Make sure to use a smart contract address compatible with your endpoint’s blockchain that emits events. 

### Start

To start the program run the following:

```sh
npm run start
```

This will start the test giving you the results in the console.

```sh
> test-rpc-getlogs-limits@1.0.0 start
> node index.js

✅ Successfully retrieved logs for the past 0 blocks. 
 * Time to retrieve: 226 ms.
 * Amount of data: 0.00 MB

✅ Successfully retrieved logs for the past 100 blocks. 
 * Time to retrieve: 227 ms.
 * Amount of data: 0.03 MB

✅ Successfully retrieved logs for the past 200 blocks. 
 * Time to retrieve: 230 ms.
 * Amount of data: 0.06 MB

✅ Successfully retrieved logs for the past 300 blocks. 
 * Time to retrieve: 263 ms.
 * Amount of data: 0.13 MB

✅ Successfully retrieved logs for the past 400 blocks. 
 * Time to retrieve: 270 ms.
 * Amount of data: 0.15 MB

✅ Successfully retrieved logs for the past 500 blocks. 
 * Time to retrieve: 273 ms.
 * Amount of data: 0.21 MB

✅ Successfully retrieved logs for the past 600 blocks. 
 * Time to retrieve: 295 ms.
 * Amount of data: 0.29 MB

✅ Successfully retrieved logs for the past 700 blocks. 
 * Time to retrieve: 282 ms.
 * Amount of data: 0.33 MB

✅ Successfully retrieved logs for the past 800 blocks. 
 * Time to retrieve: 327 ms.
 * Amount of data: 0.38 MB

✅ Successfully retrieved logs for the past 900 blocks. 
 * Time to retrieve: 313 ms.
 * Amount of data: 0.42 MB

✅ Successfully retrieved logs for the past 1000 blocks. 
 * Time to retrieve: 346 ms.
 * Amount of data: 0.46 MB
```

If the test fails the result will be something similar to this:

```sh
🚨 Something went wrong! Failed to retrieve logs for the past 35000 blocks. -> Error: Invalid JSON RPC response: {"size":0,"timeout":0}
```