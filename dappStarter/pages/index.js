import Login from "../components/Login";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
const editionDropAddress = "0x00707F39D5dA21913aD8a508f51be0D7ECc1082A";

export default function Home() {
  const address = useAddress();
  const editionDrop = useContract(editionDropAddress, "edition-drop").contract;
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!address) return;
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("has claimed NFT");
        } else {
          setHasClaimedNFT(false);
          console.log("has not claimed NFT");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.log("failed to check balance", error);
      }
    }
    checkBalance();
  }, [address, editionDrop])

  const mintNFT = async () => {
    setIsClaiming(true);
    try {
      await editionDrop.claim("0",1);
      setHasClaimedNFT(true);
      console.log("minted NFT");
    } catch (error) {
      console.log("failed to claim", error);
    } finally {
      setIsClaiming(false);
    }
  }

  if (!address) {
    return <Login />;
  }
  return (
    <div className={styles.container}>
      <h1>Mint your free soulbound token NFT!</h1>
      <button disabled={isClaiming} onClick={mintNFT}>
        {isClaiming ? "Minting..." : "Mint your NFT"}
      </button>
    </div>
  );
}
