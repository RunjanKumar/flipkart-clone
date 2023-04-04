const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email :String,
    password : String,
    phoneNo : String,
    address : String,
    state : String,
    city : String,
    pinCode : Number,
    token : String,
    OTP : Number,
    role : {
        type : String,
        default : "user",
    },
    profilePic : {
        type : String,
        default : "public/image-1680266344141.jpg"
    },
} , { timestamps : true , versionKey : false , collection : "User" } );

const User = new mongoose.model( " " , userSchema);

module.exports = { User };
