// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import '@openzeppelin/contracts/access/AccessControl.sol';
//import './ERC721Token.sol';

contract Voting is AccessControl{
    
    event AddCandidate(uint candidateId);
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public owner;
    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender == owner,"Sender is not contract owner");
        _;
    }
    struct Voter{
        bytes32 uId;
        uint votedCandidateId;        
    }
    struct Candidate{
        uint256 id;
        string name;
        string partyName;
    }
    uint numOfCandidates;
    uint numOfVoters;
    mapping (uint256 => Candidate) candidates;
    mapping (uint => Voter) voters;
    uint256 private nextId;    

    function getNumOfCandidates() public view returns(uint){
        return numOfCandidates;
    }
    function getNumOfVoters() public view returns(uint){
        return numOfVoters;
    }
    function getCandidate(uint cId) public view returns(uint,string memory,string memory){
        return (cId,candidates[cId].name,candidates[cId].partyName);
    }
    function totalVotes(uint cId) public view returns(uint){
        uint total=0;
        for(uint i = 0; i <numOfVoters ; i++){
            if(voters[i].votedCandidateId == cId){
                total++;
            }
        }
        return total;
    }

    function addUser(address user) public{
        super._setupRole(USER_ROLE, user);
    }
    function addAdmin(address admin) public{
        super._setupRole(ADMIN_ROLE, admin);
    }
    function addCandidate(string memory name, string memory partyName) public{
        //super._mint(msg.sender, nextId);
        candidates[nextId] = Candidate(nextId,name,partyName);
        nextId++;
        emit AddCandidate(nextId);        
    }
    function vote(bytes32 uId,uint votedCandidateId) public{
        uint voterId = numOfVoters++;
        voters[voterId] = Voter(uId,votedCandidateId);
    }
}