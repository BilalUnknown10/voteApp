const Voter = require("../models/Voter.model");

const registration = async (req, res) => {
   try {
     
     const {name, email, phoneNumber, cardNumber, password} = req.body;

    //  if([name, email, phoneNumber, cardNumber, password].some((some) => {
    //   return some === ""
    //  })){
    //   // console.log("all field are required");
    //    return res.status(400).json("All field are required")
    //  }

     const voterExist = await Voter.findOne({cardNumber})

     if(voterExist) {
       return res.status(300).json("Voter already exist")
     }

     const voter = await Voter.create({
        name, email, phoneNumber, cardNumber, password
     })

     return res.status(200).json(voter)

   } catch (error) {
    
    for(field in error.errors){
      return res.status(200).json(error.errors[field].message);
    }
   
   }
};




module.exports = {
    registration
}