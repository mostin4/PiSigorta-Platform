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
    mapping(string => string) public proposalCid; // 🗳️ DAO oylama sonuçları için CID saklama

    address public admin;

    event PolicyCreated(uint256 policyId, address owner, string ipfsHash);
    event VoteResultRecorded(string proposalId, string cid);

    constructor() {
        admin = msg.sender; // Kontratı deploy eden kişi admin olarak atanır
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Sadece admin kullanabilir");
        _;
    }

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

    function recordVoteResult(string memory proposalId, string memory cid) public onlyAdmin {
        proposalCid[proposalId] = cid;
        emit VoteResultRecorded(proposalId, cid);
    }

    function getVoteResultCID(string memory proposalId) public view returns (string memory) {
        return proposalCid[proposalId];
    }

    function updateAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
