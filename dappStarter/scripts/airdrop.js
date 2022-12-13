import { editionDropAddress } from "./constants.js";
import sdk from "./initialize-sdk.js";
import { votingTokenAddress, editionDropAddress, testAddress } from "./constants.js";
(async () => {
    const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
    const token = await sdk.getContract(votingTokenAddress, "token");
    try {
        //const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        const walletAddresses = [testAddress];
        if (walletAddresses.length === 0) {
            console.log("No one has claimed yet");
            return;
        }
        console.log(walletAddresses);
        const airDropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("airdropping", randomAmount, "tokens to", address);
            const airDropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            return airDropTarget;
        });
        console.log("starting airdrop");
        await token.transferBatch(airDropTargets);
        console.log("airdrop complete");

    } catch (error) {
        console.log("failed to airdrop tokens", error);
    }
})();