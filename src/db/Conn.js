const mongoose = require('mongoose');
require('dotenv').config()

// const local = process.env.Database_URL_LOCAL
const uri = process.env.Database_URL;


const connection = async () => {
    
   try {
       
       const db = mongoose.connect(`${uri}`);
       console.log("Database connection successfull");

   } catch (error) {
    console.log(error);
   }
}

module.exports = connection