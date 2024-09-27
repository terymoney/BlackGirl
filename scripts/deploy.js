// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    // Get the contract to deploy
    const BlackGirl = await hre.ethers.getContractFactory("BlackGirl");

    // Log the contract factory to ensure it's loaded correctly
    console.log("Contract factory:", BlackGirl);

    // Define constructor arguments
    const initialOwner = "0x307b0d64c8b32Ec9D0BE55B4E9dcB63A00a03148"; // Replace with the actual owner's address
    const royaltyRecipient = "0x307b0d64c8b32Ec9D0BE55B4E9dcB63A00a03148"; // Replace with the royalty recipient's address
    const royaltyPercentage = 500; // Example: 5% royalties (in basis points)

    // Deploy the contract
    const contract = await BlackGirl.deploy(initialOwner, royaltyRecipient, royaltyPercentage);
    
    // Log the contract object
    console.log("Contract object:", contract);

    // Wait for the deployment transaction to be mined
    const receipt = await contract.deployTransaction.wait();

    console.log("BlackGirl deployed to:", contract.address);
    console.log("Transaction receipt:", receipt);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });







