const express = require('express');
const userRoute = express.Router();

/* Importing modules */
const { signup , login , update , show , profilePic , generateOTP , forgetPassword , logout} = require('../Controller/userController');
const { signupSchema , loginSchema, updateSchema , profilePicSchema , generateOTPSchema , forgetPasswordSchema} = require('../Validation/userValidation');
const { joiValidate} = require('../middlweWare/joiValidate');
const { upload } = require('../middlweWare/multer');
const { userAuthentication } = require('../middlweWare/userAuthentication');

/* All routes of users */
userRoute.route('/show').get( userAuthentication() , show );
userRoute.route('/signup').post( upload , joiValidate(signupSchema) ,signup );
userRoute.route('/login').post( joiValidate(loginSchema) , login );
userRoute.route('/update').put( joiValidate(updateSchema),  userAuthentication() ,update );
userRoute.route('/profilePic').patch(upload , joiValidate(profilePicSchema) ,  userAuthentication() , profilePic);
userRoute.route('/generateOtp').get( joiValidate(generateOTPSchema),  generateOTP);
userRoute.route('/forgetPassword').post( joiValidate(forgetPasswordSchema) , forgetPassword);
userRoute.route('/logout').get( userAuthentication() , logout );


module.exports  = userRoute ; 