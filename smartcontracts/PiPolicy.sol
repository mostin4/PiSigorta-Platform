// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract PiPolicy {
    struct Policy {
        address owner;
        string ipfsHash;
        uint256 startDate;
        uint256 endDate;
        bool active;
    }

    mapping(uint256 => Policy) public policies;

    event PolicyCreated(uint256 policyId, address owner, string ipfsHash);

    function storePolicy(uint256 policyId, string memory ipfsHash) external {
        policies[policyId] = Policy({
            owner: msg.sender,
            ipfsHash: ipfsHash,
            startDate: block.timestamp,
            endDate: block.timestamp + 365 days,
            active: true
        });
        emit PolicyCreated(policyId, msg.sender, ipfsHash);
    }

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }
}
