const FighterJetSupplyChain = artifacts.require("FighterJetSupplyChain");

module.exports = function (deployer) {
  deployer.deploy(FighterJetSupplyChain);
};
