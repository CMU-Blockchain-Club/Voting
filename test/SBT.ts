import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SBT contract", function () {
  it("Attempt Token Transfer", async function () {
    const SBTContract = await ethers.getContractFactory('SBT');
    const [owner,addr1,addr2] = await ethers.getSigners();
    const sbt = await SBTContract.deploy();

    await sbt.deployed();
    await sbt.safeMint(addr1.address);
    //cannot transfer from addr1 to addr2
  });
});
