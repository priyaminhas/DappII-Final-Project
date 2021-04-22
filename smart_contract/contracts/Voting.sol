// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;
//pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/access/AccessControl.sol';
import './ERC721Token.sol';

contract Voting is ERC721Token, AccessControl{
    using Address for address;
    
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address public owner;

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

    event AddCandidate(uint256 candidateId);

    constructor(string memory _tokenURIBase) public ERC721Token(_tokenURIBase) {
        owner = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender == owner,"Sender is not contract owner");
        _;
    }
    

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

    function addUser(address user) public onlyOwner() {
        super._setupRole(USER_ROLE, user);
    }
    function addAdmin(address admin) public onlyOwner() {
        super._setupRole(ADMIN_ROLE, admin);
    }
    function addCandidate(string memory name, string memory partyName) onlyOwner public{
        super._mint(msg.sender, nextId);
        candidates[nextId] = Candidate(nextId,name,partyName);
        nextId++;
        emit AddCandidate(nextId);        
    }
    function vote(bytes32 uId,uint votedCandidateId) public{
        uint voterId = numOfVoters++;
        voters[voterId] = Voter(uId,votedCandidateId);
    }
}