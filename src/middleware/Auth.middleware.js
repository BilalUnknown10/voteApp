const jwt = require('jsonwebtoken');
const Voter = require('../models/Voter.model');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ");
  
    if(!token){
        return res.status(400).json("Unauthorized request")
    }

    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

    if(!verifyToken){
        return res.status(400).json("Invalid Token")
    }

    const voter = await Voter.findById(verifyToken._id)

    req.voter = voter;
    req.id = voter._id
  
    next()
}

module.exports = authMiddleware