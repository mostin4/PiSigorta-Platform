require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.4",
  networks: {
    pichain: {
      url: "https://rpc.testnet.minepi.com", // Örnek Pi testnet RPC
      accounts: ["0xPRIVATE_KEY"] // Cüzdan anahtarını buraya ekle
    }
  }
};
