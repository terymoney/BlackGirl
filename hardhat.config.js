require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  
};



/* sepolia: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  Alchemy:{
    apiKey: process.env.ALCHEMY_API_KEY,
  }*/

  /** @type import('hardhat/config').HardhatUserConfig */
/*module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};*/


