import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// accounts == accounts that we use to fund this contract
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia:{                                        
      url: 'https://eth-sepolia.g.alchemy.com/v2/U2IdPu_0Crca1Xvju16JfWbTDQ8ZopeF',
      accounts: ["642a7bd9ba52b495360e15015df85d34b142b222e9552e1ccb0a0c577dd4e67a"]
    }
  }
};

export default config;
