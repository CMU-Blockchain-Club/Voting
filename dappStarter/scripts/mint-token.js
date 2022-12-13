import { ethers } from "ethers";
import sdk from './initialize-sdk.js';
import { votingTokenAddress, editionDropAddress, testAddress } from "./constants.js";
(async () => {
    const contract = await sdk.getContract(votingTokenAddress, "token");
    try {
        const amount = "1000000";
        const tx = await contract.mint(amount);
        const tokenSupply = await contract.totalSupply();
        console.log("minted", amount, "tokens, total supply is", tokenSupply.toString());
    } catch (error) {
        console.error("failed to mint tokens", error)
        process.exit(1);
    }
})();