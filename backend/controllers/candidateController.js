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
    const currentOwnerAddress = '0x27F0E0e0ad7C01DEBF52C51A09B7d3E295AA85064';
    const userId = req.cookies.userId;
    connect
    .voteCandidate(currentOwnerAddress,name,userId)
    .then((result) => {
        console.log(result);
        res.json({ message: "Candidate Voted successfully" });
    })
    .catch(err =>{
        return next(err);
    });
}