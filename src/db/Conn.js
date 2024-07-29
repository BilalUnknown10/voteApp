const mongoose = require('mongoose');
// require('dotenv').config()

const uri = process.env.Database_URL;
const name = process.env.Database_NAME


const connection = async () => {
    
   try {
       
       const db = mongoose.connect(`${uri}/${name}`);
       console.log("Database connection successfull");

   } catch (error) {
    console.log(error);
   }
}

module.exports = connection