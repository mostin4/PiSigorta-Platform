const hre = require("hardhat");

async function main() {
  const PiPolicy = await hre.ethers.getContractFactory("PiPolicy");
  const contract = await PiPolicy.deploy();
  await contract.deployed();
  console.log("✅ PiPolicy deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
