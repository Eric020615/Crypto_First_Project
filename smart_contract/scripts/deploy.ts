import { ethers } from "hardhat";

const main = async() => {
  const Transactions = await ethers.deployContract("Transactions");

  await Transactions.waitForDeployment();

  console.log("Transactions deployed to: ", await Transactions.getAddress());
}

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  }
  catch(error){
    console.error(error);
    process.exit(1);
  }
}

runMain();