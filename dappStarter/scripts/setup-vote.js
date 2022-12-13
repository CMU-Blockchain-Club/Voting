import sdk from "./initialize-sdk.js";
import { votingTokenAddress, voteAddress } from "./constants.js";

(async () => {
    const vote = await sdk.getContract(voteAddress, "vote");
    const token = await sdk.getContract(votingTokenAddress, "token");
    try {
        await token.roles.grant("minter", vote.getAddress());
        console.log("granted minter role to vote contract");
    } catch (error) {
        console.error("failed to grant minter role to vote contract", error);
        return;
    }
})();