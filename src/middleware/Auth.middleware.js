const jwt = require('jsonwebtoken');
const Voter = require('../models/Voter.model');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ");
  
    if(!token){
        return res.status(400).json("Unauthorized request")
    }

    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

    const voter = await Voter.findById(verifyToken?._id);
    
    if(!verifyToken){
        return res.status(400).json("Invalid Token")
    }


    req.voter = voter;
    req.id = voter._id
  
    next()
}

module.exports = authMiddleware