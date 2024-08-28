const jwt = require('jsonwebtoken');
const Voter = require('../models/Voter.model');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace('Bearer', "").trim();
    
    if(!token){
        return res.status(400).json("Unauthorized request")
    } 

    const verifyToken =  jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    
    
    
    if(!verifyToken){
        return res.status(400).json("Invalid Token")
    }
    
    const voter = await Voter.findById(verifyToken?._id).select({
        password : 0,
        cardNumber : 0,
        votePole : 0,
        phoneNumber : 0
    });
    
    req.voter = voter;
    req.id = voter._id
  
    next()
}

module.exports = authMiddleware