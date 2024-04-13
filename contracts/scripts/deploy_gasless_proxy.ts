import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const GaslessProxy = await ethers.getContractFactory("GaslessProxy");
  const gaslessProxy = await GaslessProxy.deploy();

  await gaslessProxy.waitForDeployment();

  console.log("Gassless proxy deployed to:", gaslessProxy.address);

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY_GASLESS_PROXY as string,
    ethers.provider
  );
  await gaslessProxy.setKeypair({
    addr: process.env.PUBLIC_KEY_GASLESS_PROXY,
    secret: Uint8Array.from(
      Buffer.from(process.env.PRIVATE_KEY_GASLESS_PROXY as string, "hex")
    ),
    nonce: await wallet.getNonce(),
  });
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
