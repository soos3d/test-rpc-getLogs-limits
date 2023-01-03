// Main file of the program.
// It imports the testLogs function.
// Allows you to configure the test: max blocks in the past, start, increment, address.
// Runs a loop trying to get logs starting at 0 blocks in the past.

// The testLogs function calculates the range of blocks based on the latest block.
const { testLogs } = require('./utils/testLogs')

async function main() {

    // Max limit of blocks in the past
    const blocks = 1100

    // Starting point
    let testedBlocks = 0

    // Blocks increment, each loop add 100 blocks to the getLogs query
    const increment = 100

    // Address to get logs from
    const address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" // WAVAX

    while (testedBlocks < blocks) {
        await testLogs(testedBlocks, address)
        testedBlocks += increment
    }
}

main()