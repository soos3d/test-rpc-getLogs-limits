// This file holds the logic and the testing function
// The testLogs function tries to retreive the logs for the amount of blocks specified by the index.js file
// It calculates how long it takes and approximatively how much data is retrieved
// It prints an error if the tast fails
// It import the getSizeMb function from the getsize file

const Web3 = require("web3");
const { getSizeMb } = require('../utils/getSize')
require('dotenv').config();


// Initialize connection to the node. 
const node_url = process.env.EVM_NODE_URL;
const web3 = new Web3(new Web3.providers.HttpProvider(node_url))


async function testLogs(range, address) {

    // Find the latest block, then calculate the start block based on the function's parameter
    const latestBlock = await web3.eth.getBlockNumber()
    const startBlock = latestBlock - range

    // Set the parameters for the getPastLogs method
    const params = {
        fromBlock: startBlock,
        toBlock: 'latest',
        address: address,
    };

    const start = Date.now()
    await web3.eth.getPastLogs(params, (err, rawLogs) => {
        const end = Date.now()

        const time = Math.round(end - start)

        // Calculate the approximate size of the data, retrned in MB
        const sizeMb = getSizeMb(rawLogs)

        if (err) {
            console.log(`🚨 Something went wrong! Failed to retrieve logs for the past ${range} blocks. -> ${err} \n`)
        } else {
            //console.log(rawLogs)
            console.log(`✅ Successfully retrieved logs for the past ${range} blocks. \n * Time to retrieve: ${time} ms. \n * Amount of data: ${sizeMb} MB \n`)
        }
    })
}

module.exports = {
    testLogs
}