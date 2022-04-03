const hre = require("hardhat");

async function main() {
  const Dwitter = await hre.ethers.getContractFactory("Dwitter");
  const dwitter = await Dwitter.deploy();

  await dwitter.deployed();

  console.log("Dwitter deployed to: ", dwitter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    process.exit(1);
  });
