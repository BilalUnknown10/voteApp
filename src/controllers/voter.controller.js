const Voter = require("../models/Voter.model");

const registration = async (req, res) => {
   try {
     const response = req.body;
     
    const voter = await Voter.create(response)

     res.status(200).json(voter)

   } catch (error) {
    console.log(error.errorResponse.errmsg);
   };
};




module.exports = {
    registration
}