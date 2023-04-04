const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const options = {
    min: 8,
    max: 50,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: Infinity,
  };
  const phoneOptions = {
    min: 10,
    max: 10,
    lowerCase: 0,
    upperCase: 0,
    numeric: 10,
    symbol: 0,
    requirementCount: Infinity,
  };


/* validation for signup  */
const signupSchema = joi.object({
    name : joi.string().min(1).max(30).required(),
    email : joi.string().email().lowercase(),
    password : passwordComplexity(options).required(),
    phoneNo : passwordComplexity(phoneOptions),
    role : joi.string().valid("user" , "shopkeeper" , "deliveryBoy"),
    address : joi.string(),
    pinCode : joi.number(),
    city : joi.string(),
    state : joi.string(),
}).xor("email" , "phoneNo");

/* validation for login  */
const loginSchema = joi.object({
    phoneNo : passwordComplexity(phoneOptions),
    email : joi.string().email().lowercase(),
    password : passwordComplexity(options).required(),
});

/* validation for update  */
const updateSchema = joi.object({
    name : joi.string().min(1).max(30),
    email : joi.string().email().lowercase(),
    password : passwordComplexity(options),
    phoneNo : passwordComplexity(phoneOptions),
    address : joi.string(),
    pinCode : joi.number(),
    city : joi.string(),
    state : joi.string(),
}).min(1);


/* validation for profilePic  */
const profilePicSchema = joi.object({
   method : joi.string().valid('remove' , 'update').required()
});

/* validation for generateOTPSchema */
const generateOTPSchema = joi.object({
    email : joi.string().email(),
    phoneNo : passwordComplexity(phoneOptions),
}).xor("email" , "phoneNo");

/* validation for forgetPasswordSchema */
const forgetPasswordSchema = joi.object({
    OTP : joi.number().min(0).required(),
    password : passwordComplexity(options).required(),
    email : joi.string().email(),
    phoneNo : passwordComplexity(phoneOptions),
}).xor("email" , "phoneNo");



/* Exporting modules */
module.exports = {
    signupSchema ,
    loginSchema,
    updateSchema,
    profilePicSchema,
    generateOTPSchema,
    forgetPasswordSchema
};