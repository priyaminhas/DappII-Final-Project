const web3 = require('web3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usersModel = require('../database/models/users');
const connectWeb3 = require('../connectWeb3');

exports.login = async (req, res) => {
    const name = req.body.inputEmail;
    const password = req.body.inputPassword;
    
    if (!name || !password) {
        return res.status(401).json({ message: 'Username and Password are not correct!' });
    }

    const user = await usersModel.findOne({ name });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Username' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const userJWT = jwt.sign({ name }, process.env.PRIVATE_KEY, { algorithm: 'HS256' });
    res.status(200).json({ userJWT, address: user.address, userType: user.userType, userId: user._id });
}

exports.all = async (req,res) => {
    const users = await usersModel.find();
    console.log(users);
    res.status(200).json(users);
}

exports.add =  async (req,res) => {
    const user_name = req.body.user_name;
    const user_type = req.body.user_type; 
    const password = user_name+"123";
    var userObj = {name:user_name,userType:user_type,password:password};
   
    const newUser = new usersModel(userObj);
    newUser.save(function(err){
        if(err){
            cb(err,null); 
            return;  
        }
        res.json({ message:"New User Created:"+newUser.name,added:1});
    });
    return 1; 
}