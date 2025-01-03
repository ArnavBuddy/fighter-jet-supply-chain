document.addEventListener("DOMContentLoaded", async () => {
  // Initialize web3
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to Ethereum");
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else {
    alert("Please install MetaMask!");
    return;
  }

  const contractAddress = "<CONTRACT-ADDRESS>"; // Replace with deployed contract address
  const contractABI = [
    //ABI JSON Here
  ];

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const addComponentForm = document.getElementById("addComponentForm");
  const transferOwnershipForm = document.getElementById(
    "transferOwnershipForm"
  );
  const updateCertificationForm = document.getElementById(
    "updateCertificationForm"
  );
  const fetchDetailsForm = document.getElementById("fetchDetailsForm");
  const componentList = document.getElementById("componentList");

  // Add Component
  addComponentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const componentId = document.getElementById("componentId").value;
    const details = document.getElementById("details").value;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addComponent(componentId, details)
        .send({ from: accounts[0] });
      alert("Component added successfully!");
    } catch (error) {
      console.error("Error adding component:", error);
    }
  });

  // Transfer Ownership
  transferOwnershipForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const componentId = document.getElementById("transferComponentId").value;
    const newOwner = document.getElementById("newOwner").value;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .transferOwnership(componentId, newOwner)
        .send({ from: accounts[0] });
      alert("Ownership transferred successfully!");
    } catch (error) {
      console.error("Error transferring ownership:", error);
    }
  });

  // Update Certification
  updateCertificationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const componentId = document.getElementById("certComponentId").value;
    const certified = document.getElementById("certified").checked;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .updateCertificateStatus(componentId, certified)
        .send({ from: accounts[0] });
      alert("Certification status updated!");
    } catch (error) {
      console.error("Error updating certification status:", error);
    }
  });

  // Fetch Component Details
  fetchDetailsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const componentId = document.getElementById("fetchComponentId").value;

    try {
      const details = await contract.methods
        .getComponentDetails(componentId)
        .call();
      const listItem = document.createElement("li");
      listItem.textContent = `ID: ${componentId}, Details: ${details.details}, Owner: ${details.owner}, Certified: ${details.certified}`;
      componentList.appendChild(listItem);
    } catch (error) {
      console.error("Error fetching component details:", error);
    }
  });
});
