import sdk from "./initialize-sdk.js";
import { votingTokenAddress, voteAddress } from "./constants.js";
import { ethers } from "ethers";
(async () => {
    const vote = await sdk.getContract(voteAddress, "vote");
    const token = await sdk.getContract(votingTokenAddress, "token");
    try {
        const amount = 420000;
        const description = `should the DAO mint ${amount} tokens?`;
        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode("mintTo", [
                    vote.getAddress(),
                    amount.toString()
                ])
            }
        ]
        await vote.propose(description, executions);
        console.log("proposed minting tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        return;
    }
})();