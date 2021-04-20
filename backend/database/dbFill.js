require('dotenv').config();
const Web3 = require('web3');
const async = require('async');
const mongoose = require('mongoose');

const Users = require('./models/users');
const Candidates = require('./models/candidates');

const randomGenerator = require('../utils/randomGenerator');
const initMongo = require('./connect');

const mongoURI = process.env.MONGODB_URI_DEV;
initMongo(mongoURI,true);
const addressJSON = require('../../smart_contract/build/contractAddress.json');
const contractJSON = require('../../smart_contract/build/contracts/Voting.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

const totalCandidates = 4;
async function initSmartContractData(){
    web3 = new Web3(process.env.BLOCKCHAIN_EMULATOR_URI);
    accounts = await web3.eth.getAccounts();
    
    contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS,{from:accounts[0]});

    admin = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    user3 = accounts[3];
}

function populateUsers(cb){
    async.series([
        (cb) => {
            createUser({
                name : "admin",
                password: "admin123",
                address: admin,
                userType: 1
            },cb)
        },
        (cb) => {
            createUser({
                name : "user1",
                password: "user123",
                address: user1,
                userType: 2
            },cb)
        },
        (cb) => {
            createUser({
                name : "user2",
                password: "user123",
                address: user2,
                userType: 2
            },cb)
        },
        (cb) => {
            createUser({
                name : "user3",
                password: "user123",
                address: user3,
                userType: 2
            },cb)
        }
    ],cb);

}

function createUser({name,password,address,userType},cb){
    const newUser = new Users({name, password, address,userType});
    newUser.save(function(err){
        if(err){
            cb(err,null);
            return;
        }
        console.log("New User:"+newUser.name);
        if(userType === 2){
            contract.methods
            .addUser(address)
            .send({ from: admin })
            .then(() => {
                console.log(`Added user: ${address}`);
            })
            .catch(err => {
                console.log('Ooppss...user', err);
            })
        }
        cb(null, newUser);
    });
}

function createCandidate({name,partyName},cb){
    const newCandidate = new Candidates({name,partyName});
    newCandidate.save(function(err){
        if(err){
            cb(err,null);
            return;
        }
        console.log("New Candidate Created:"+newCandidate.name);
    });
}

function populateCandidates(cb){
    let candidatesArr = [];
    for(i=1;i<totalCandidates;i++){
        var candidateName = 'candidate'+i;
        var pName = 'party'+i;
        candidatesArr.push(
            (cb) => {
                contract.methods.addCandidate(
                    candidateName,
                    pName
                )
                .send({from:admin, gas: 500000})
                .then(() => {
                    createCandidate({
                        name: candidateName,
                        partyName: pName
                    },cb)
                })
                .catch(err => {
                    console.log(`Error in Candidate${i} creation`);
                })
                .finally(() => cb())
            }
        )
    }
    console.log(candidatesArr);
    async.series(candidatesArr, cb);
}
async.series([
    initSmartContractData,
    populateUsers,
    populateCandidates
    ],
    function (err) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Success');
        }
        mongoose.connection.close();
});