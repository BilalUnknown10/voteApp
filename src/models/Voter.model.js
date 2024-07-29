const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const voterSchema = new Schema({

    name : {
        type : String,
        min: [3, 'min 3 character'],
        required : [true, "name are required"]
    },
    email : {
        type : String,
        required : [true, "email are required"],
        unique : [true, "email are unique"],
    },
    cardNumber : {
        type : Number,
        required : [true, "Card number are required"],
        unique : [true, "Card number are unique"],
    },
    phoneNumber : {
        type : Number,
        required : [true, "Phone number are required"],
        min : [11, "minimuim 11 character"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Password are required"],
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
});

voterSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}

const Voter = new model("Voter", voterSchema);

module.exports = Voter