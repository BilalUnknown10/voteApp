const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const voterSchema = new Schema({

    name : {
        type : String,
        min: [3, 'min 3 character'],
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    cardNumber : {
        type : Number,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        min : [11, "minimuim 11 character"],
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    votePole : {
        type : Boolean,
        default : false
    },
    access_Token : {
        type : String
    }

});

voterSchema.pre("save", async function (next){

    try {
        if(!this.isModified("password")){
            return next();
        }
            
        this.password = await bcrypt.hash(this.password, 10);
        next()
    } catch (error) {
        console.log(error);
    }
})

const Voter = new model("Voter", voterSchema);

module.exports = Voter