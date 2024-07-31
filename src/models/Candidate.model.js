const { Schema, model } = require("mongoose");


const  candidateSchema = new Schema({
    
   name : {
        type : String,
        min : [3, "minimuim 3 character"],
        required : true
    },
   PartyName : {
        type : String,
        required : true
   },
   voter : {
    type : Schema.Types.ObjectId,
    ref : "Voter"
   }

});


const Candidate = new model("Candidate", candidateSchema);

module.exports = Candidate;