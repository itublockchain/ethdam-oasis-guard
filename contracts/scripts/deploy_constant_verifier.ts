import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const Verifier = await ethers.getContractFactory("ConstantVerifier");
  const verifier = await Verifier.deploy();

  await verifier.waitForDeployment();

  console.log("Verifier deployed to:", verifier.address);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
