import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === '') {
    console.log('Please set your PRIVATE_KEY in the .env file');
}
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === '') {
    console.log('Please set your ALCHEMY_API_URL in the .env file');
}
if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === '') {
    console.log('Please set your WALLET_ADDRESS in the .env file');
}
const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
);
(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log('address', address);
    } catch (error) {
        console.error("failed to get address", error)
        process.exit(1);
    }
})();
export default sdk;