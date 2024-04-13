import { ethers } from "hardhat";
require("dotenv").config();
console.log(process.env.PUBLIC_KEY_GASLESS_PROXY);
async function main() {
  const AccountFactory = await ethers.getContractFactory("AccountFactory");
  const accountFactory = await AccountFactory.deploy();

  await accountFactory.waitForDeployment();

  console.log("AccountFactory deployed to:", accountFactory.address);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
