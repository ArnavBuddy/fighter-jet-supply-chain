const FighterJetSupplyChain = artifacts.require("FighterJetSupplyChain");

contract("FighterJetSupplyChain", (accounts) => {
  it("should add a component successfully", async () => {
    const instance = await FighterJetSupplyChain.deployed();
    await instance.addComponent(1, "Wing", "Boeing", "Batch001", accounts[0]);
    const details = await instance.getComponentDetails(1);
    assert.equal(details[1], "Wing", "Component name is incorrect");
  });

  it("should update certification status", async () => {
    const instance = await FighterJetSupplyChain.deployed();
    await instance.updateCertification(1, true);
    const details = await instance.getComponentDetails(1);
    assert.equal(details[4], true, "Certification status not updated");
  });
});
