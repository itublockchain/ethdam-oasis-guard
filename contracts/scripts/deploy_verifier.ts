import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const Verifier = await ethers.getContractFactory("P256Verifier");
  const verifier = await Verifier.deploy();

  await verifier.waitForDeployment();

  console.log("P256Verifier deployed to:", verifier.address);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
