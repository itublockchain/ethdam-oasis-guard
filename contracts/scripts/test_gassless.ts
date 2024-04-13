import { ethers } from "hardhat";

async function main() {
  const CommentBox = await ethers.getContractFactory("CommentBox");
  const commentBox = await CommentBox.deploy();
  await commentBox.waitForDeployment();

  console.log("CommentBox deployed to:", commentBox.address);

  //const Gasless = await ethers.getContractFactory("GaslessProxy");
  const gasless = await ethers.getContractAt(
    "GaslessProxy",
    "0x7DB90F79acAB311271E217b4712082d250F8e8d7"
  );
  const innercall = commentBox.interface.encodeFunctionData("comment", [
    "Hello, free world!",
  ]);
  const tx = await gasless.makeProxyTx(commentBox.address, innercall);

  const plainProvider = new ethers.JsonRpcProvider(
    "https://testnet.sapphire.oasis.io"
  );
  const plainResp = await plainProvider.broadcastTransaction(tx);

  const receipt = await ethers.provider.getTransactionReceipt(plainResp.hash);
  if (!receipt || receipt.status != 1) throw new Error("tx failed");
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
