const Candidate = require('../models/Candidate.model');
const Voter = require("../models/Voter.model");



const generateAccessToken = async (userId) => {
  try {
    const voter = await Voter.findOne(userId)

    const token = await voter.generateAccessToken()
    
    voter.access_Token = token;
      
    await voter.save();

    return token
    
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

    //  const voterExist = await Voter.findOne({
    //   $or : [{cardNumber},{email}]
    //  })

    const checkinCnic = await Voter.findOne({cardNumber})

     if(checkinCnic) {
       return res.status(300).json("cnic already exist")
     }

     const checkingEmail = await Voter.findOne({email});
     if(checkingEmail){
      return res.status(300).json("this email already exist")
     }

     const checkingPhone = await Voter.findOne({phoneNumber});
     if(checkingPhone){
      return res.status(300).json(" phone number already exist")
     }
     

     const voter = await Voter.create({
        name, email, phoneNumber, cardNumber, password
     })

     const accessTokenGenerate = await generateAccessToken(voter._id)

       const options = {
        httpOnly : true,
        secure : true
       }

     return res
     .status(200)
     .cookie("accessToken", accessTokenGenerate, options)
     .json("User registered successfully")

   } catch (error) {
    
    for(field in error.errors){
      return res.status(400).json(error.errors[field].message);
      // return res.status(400).json(error)
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

      const accessTokenGenerate = await generateAccessToken(voter._id)

       const options = {
        httpOnly : true,
        secure : true
       }

    return res
    .status(200)
    .cookie("accessToken", accessTokenGenerate, options)
    .json( "User logged in successfully" );
    
  } catch (error) {
    
    for(field in error.errors){
      return res.status(400).json(error.errors[field].message)
    }

  };
};

const logOut = async (req, res) => {
  try {
    const voter = req.voter;

    voter.access_Token = undefined

    await voter.save()

    res
    .status(200)
    .clearCookie("accessToken")
    .json(voter)
    
  } catch (error) {
    for(field  in error.errors){
      res.status(200).json(error.errors[field].message)
    }
  }
}

const votePole = async (req, res) => {

  try {

    const id = req.id;

    const user = await Voter.findById(id);

    if(!user){
      return res.status(300).json('User are not found')
    }

    if(user.votePole === true){
      return res.status(300).json('User already pole vote');
    }
    
    const {name, partyName} = req.body;

    const candidate = await Candidate.create({
      name, partyName, voter : id
    });

    user.votePole = true;
    await user.save();
    
    return res
    .status(200)
    .json('Vote pole successfully');

  } catch (error) {
    console.log(error)
  }
};

const checkUserLogin = async (req, res) => {
  try {
    const name = req.voter.name

    res.status(200).json("Hello this is me")
  } catch (error) {
    console.log('Error from checking user',error);
    
  }
}

const voteCount = async (req, res) => {
  try {

    const party = req.params;

    const count = await Candidate.aggregate([
      {
        $match : {
          partyName : party.party
        }
      },
      {
        $count : "voteCount"
      }
    ])

    if(count[0]?.voteCount === undefined){
      return res.status(200).json(0)
    }
    return res.status(200).json(count[0]?.voteCount)
  } catch (error) {
    console.log(error);
    
  }
}

const home = (req, res) => {
  res.status(200).json('This is from voter controller file')
}

module.exports = {
    registration,
    login,
    logOut,
    votePole,
    checkUserLogin,
    voteCount,
    home
}