const Voter = require("../models/Voter.model");



const generateAccessToken = async (userId) => {
  try {
    const voter = await Voter.findOne(userId)

    const token = await voter.generateAccessToken()
    
    voter.access_Token = token;

    return await voter.save()
    
  } catch (error) {
    console.log("error in generating acces token function", error);
  }
}

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

     await generateAccessToken(voter._id)

     return res.status(200).json(voter)

   } catch (error) {
    
    for(field in error.errors){
      return res.status(200).json(error.errors[field].message);
    }
   
   }
};

const login = async (req, res) => {
  try {

    const {cardNumber, password} = req.body;

    const voter = await Voter.findOne({cardNumber});

    if(!voter){
      return res.status(400).json("Card number are not register")
    }

    const passwordCheck = await voter.isPasswordCorrect(password);

    if(!passwordCheck){
      return res.status(400).json("Invalid password");
    }

       await generateAccessToken(voter._id)

    return res.status(200).json( "User logged in successfully" );
    
  } catch (error) {
    
    for(field in error.errors){
      return res.status(400).json(error.errors[field].message)
    }

  };
};



module.exports = {
    registration,
    login
}