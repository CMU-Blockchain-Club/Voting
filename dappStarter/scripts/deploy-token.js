import { AddressZero } from "@ethersproject/constants";
import sdk from "./initialize-sdk.js";

(async () => {
    try {
        const tokenAddress = await sdk.deployer.deployToken({
            name: "Soulbound Token",
            symbol: "SOUL",
            primary_sale_recipient: AddressZero,
        })
        console.log("token deployed at", tokenAddress)
    } catch (error) {
        console.error("failed to deploy token", error)
    }
})();