![alt text](https://github.com/priyaminhas/DappII-Final-Project/blob/master/frontend/src/logo.png)

Blockchain based solution for online Voting using Node.js, ReactJs, Solidity. Presented as the Capstone Project for the Blockchain Development program from George Brown College.

# Introduction #
Voting is the method for a group or a community to take a collective decision with or without discussions, debates etc. As far as the statistics are concerned there are 165 democracies in the world which consist of both full and flawed democracies. All these democracies need voting to work and function properly. 

The conventional methods of voting such are Electronic Voting Machines or Ballot Voting have proven to be vulnerable to issues such as Ballot Stuffing, EVM tampering, Booth Capturing etc. So blockchain can prove to be a boon for the voting and some of the benefits are:
1. Tamper Proof Voting
2. Convenient 
3. Anonymity
4. Trustable voting system
5. Environment Friendly  

# Work Flow of the project #

![flowdiagram](https://github.com/priyaminhas/DappII-Final-Project/blob/master/project_documents/flowchart_milestone.png) 

The above diagram explains the workflow of the current and the future milestones. Here are the steps involved in the current milestone:
1. There are two types of users in the system an Admin and a user or voter.
2. Admin can login to the system to view the users, the candidates in the system and the total number of votes given to the candidates in a pie chart.
3. The user can login to the system with their username and password. They can view all the candidates present in the system and vote for any candidate which will be saved in the blockchain.
4. In future milestones users can login with their biometric identity as well as they can update their votes on a later stage.

You can check the above diagram [here](https://github.com/priyaminhas/DappII-Final-Project/blob/master/project_documents/flowchart_milestone.png)

# Sequence Diagram #
The following diagram shows the sequence diagram of the current milestone.
![Sequence_Diagram](https://github.com/priyaminhas/DappII-Final-Project/blob/master/project_documents/Sequence_diagram_voting.png) 

# Chaincode functions #

Function Name | Function Visibility | Function mutability | Modifiers | Parameters | Action - Notes
--- | --- | --- | --- | --- | ---
 constructor | public | N/A | N/A | N/A | Sets the owner as msg.sender 
 totalVotes |	Public	| N/A	| N/A |	cId – candidate Id	Returns the total number of the Votes given to the particular candidate
 addCandidate	| Public |	N/A	| onlyOwner	| name – Candidate name
partyName – Party Name	| - gets the number of candidates already created
- creates a new candidate with the name and party name passed as parameter
- notifies when candidate is created
vote |	Public |	N/A	| N/A |	uId – user Id
cId – candidate Id	| Adds a new vote from the user to the candidate mentioned as the candidate Id


# How to Run #
Clone the repo in the folder you want using command prompt

`git clone https://github.com/priyaminhas/DappII-Final-Project.git
cd  DappII-Final-Project`

A .env file needed to be added at backend folder with the following data in it
`PORT=5000
MONGODB_URI_DEV="mongodb://localhost:27017"
MONGODB_URI_TEST="YOUR_TEST_MONGO_URI"
PRIVATE_KEY=""
BLOCKCHAIN_EMULATOR_URI="http://127.0.0.1:9545/"
`

Then open three terminals to run the blockchain emulator, frontend and backend.

For the frontend
`cd frontend
npm install
npm run start`

For the backend
`cd backend
npm install
#To populate the mongodb with test data
npm run populate
npm run start`

For truffle to start
`cd smart_contract
truffle develop
migrate`


The Credentials for admin are as follows:
admin/admin123

And the credentials for users are as follows:
user1/user123
user2/user123

