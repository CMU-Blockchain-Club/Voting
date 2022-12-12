const hre = require("hardhat");
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const SBTContract = await ethers.getContractFactory('SBT');
  const [owner,addr1,addr2] = await ethers.getSigners();
  const sbt = await SBTContract.deploy();

  await sbt.deployed();
  await sbt.safeMint(addr1.address);

  console.log("Token deployed to:", sbt.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  