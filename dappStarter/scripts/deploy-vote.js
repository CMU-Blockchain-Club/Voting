import sdk from "./initialize-sdk.js";
import { votingTokenAddress } from "./constants.js";
(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            name: "Soulbound DAO",
            voting_token_address: votingTokenAddress,
            voting_delay_in_blocks: 0,
            voting_period_in_blocks: 6570,
            voting_quorum_fraction: 0,
            proposal_token_threshold: 0
        });
        console.log("vote deployed at", voteContractAddress)
    } catch (error) {
        console.error("failed to deploy vote", error)
    }
})();