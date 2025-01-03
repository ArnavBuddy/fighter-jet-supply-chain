// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FighterJetSupplyChain {
    // Structure to represent a component
    struct Component {
        uint256 componentId;
        string name;
        string manufacturer;
        string batchNumber;
        bool certified;
        address currentHolder;
    }

    // Mapping to store components by their ID
    mapping(uint256 => Component) public components;

    // Event to log new component additions
    event ComponentAdded(
        uint256 componentId,
        string name,
        string manufacturer,
        string batchNumber
    );

    // Event to log certification updates
    event CertificationUpdated(uint256 componentId, bool certified);

    // Event to log transfer of ownership
    event OwnershipTransferred(uint256 componentId, address newHolder);

    // Add a new component
    function addComponent(
        uint256 _componentId,
        string memory _name,
        string memory _manufacturer,
        string memory _batchNumber,
        address _initialHolder
    ) public {
        require(
            components[_componentId].componentId == 0,
            "Component ID already exists"
        );

        components[_componentId] = Component({
            componentId: _componentId,
            name: _name,
            manufacturer: _manufacturer,
            batchNumber: _batchNumber,
            certified: false,
            currentHolder: _initialHolder
        });

        emit ComponentAdded(_componentId, _name, _manufacturer, _batchNumber);
    }

    // Update certification status
    function updateCertification(uint256 _componentId, bool _certified) public {
        require(
            components[_componentId].componentId != 0,
            "Component does not exist"
        );

        components[_componentId].certified = _certified;

        emit CertificationUpdated(_componentId, _certified);
    }

    // Transfer ownership of a component
    function transferOwnership(uint256 _componentId, address _newHolder) public {
        require(
            components[_componentId].componentId != 0,
            "Component does not exist"
        );
        require(
            components[_componentId].currentHolder == msg.sender,
            "Only the current holder can transfer ownership"
        );

        components[_componentId].currentHolder = _newHolder;

        emit OwnershipTransferred(_componentId, _newHolder);
    }

    // View details of a component
    function getComponentDetails(
        uint256 _componentId
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            bool,
            address
        )
    {
        require(
            components[_componentId].componentId != 0,
            "Component does not exist"
        );

        Component memory c = components[_componentId];
        return (
            c.componentId,
            c.name,
            c.manufacturer,
            c.batchNumber,
            c.certified,
            c.currentHolder
        );
    }
}
