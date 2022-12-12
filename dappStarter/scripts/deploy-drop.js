import { ethers } from "ethers";
import sdk from './initialize-sdk.js';

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "Test Edition Drop",
            description: "This is a test edition drop",
            image: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
            primary_sale_recipient: ethers.constants.AddressZero
        });
        const editionDrop = await sdk.getContract(editionDropAddress);
        console.log("editionDrop metadata", editionDrop);
        console.log("editionDrop address", editionDropAddress);
    } catch (error) {
        console.log("failed to deploy editionDrop contract", error)
    }
})();