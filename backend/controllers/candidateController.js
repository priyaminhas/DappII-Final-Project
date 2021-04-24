const web3 = require('web3');
const candidateModel = require('../database/models/candidates');
const userModel = require('../database/models/users');
const connect = require('../connectWeb3');

exports.all = async (req,res) => {
    // const user = await userModel.findOne({ address: req.cookies.address });
    // if (!user) {
    //     return res.status(401).json({ message: 'User not found' });
    // }
    const candidates = await candidateModel.find();
    console.log(candidates);
    res.status(200).json(candidates);
}

exports.vote =  async (req,res,next) => {
    const name = req.body.name;
    const candidateId = req.body.id;
    const currentOwnerAddress = '0x27F0E0e0ad7C01DEBF52C51A09B7d3E295AA85064';
    const userId = req.cookies.userId;
    var candidate = await candidateModel.findById(candidateId);
    var candidateVotes= candidate.votes != undefined ? candidate.votes : 0 ;
    candidateVotes+=1;
    var filter= { _id: candidateId };
    const updateDoc = {
        $set: {
          votes:candidateVotes,
        },
      };
    const options = { upsert: true };
    const result = await candidateModel.updateOne(filter, updateDoc, options);
  
    if(result.ok==1){
        res.json({ message: "Candidate Voted successfully" ,vote:1});
    }
    connect
    .voteCandidate(currentOwnerAddress,name,userId)
    .then((result) => {
        
        
        res.json({ message: "Candidate Voted successfully" });
    })
    .catch(err =>{
        return next(err);
    });
}