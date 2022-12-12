import sdk from './initialize-sdk.js';
const editionDropAddress = "0x00707F39D5dA21913aD8a508f51be0D7ECc1082A";
const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Test NFT",
                description: "This is a test NFT",
                image: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
            }
        ]);
        console.log("created the new NFT");
    } catch (error) {
        console.error("failed to create the new NFT", error)
    }
})();