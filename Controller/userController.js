const jwt = require('jsonwebtoken');
const message = require('../utils/message');
const secretKey = process.env.SECRET_KEY || 'runjan' ;


/* importing modules */
const {  findOne , save , findOneAndUpdate } = require('../service/mongooseService');
const { User } = require('../Model/userModel');
const { hashPassword } = require('../utils/commonFunction');

/* api for user signup 
@Route POST /user/signup
@access public
@ params request , response 
*/
const signup = async (req , res) => {
  const bodyData = req.body;

  /* Checking Email and Phone Number from the Database */
  const result1 = await findOne( User , {email : bodyData.email});
  const result2 = await findOne( User , {phoneNo : bodyData.phoneNo});
  if(result1 && result2){
    const msg = bodyData.email ? message.NOT_A_UNIQUE_EMAIL : message.NOT_A_UNIQUE_PHONE_NUMBER;
    return res.status(400).json({ StatusCode : 400,  msg   });
  }

  /* Hashing the Password */
  bodyData.password = hashPassword(bodyData.password);

  /* adding add to the database */
  const document = new User(bodyData);
  let token = jwt.sign({id : document._id} , secretKey );
  if(req.file){
    document.profilePic = req.file.path;
  }
  document.token = token;
  await save(document);
  return res.status(200).json({ StatusCode : 200,  msg : message.SIGNUP, token : token });
};

/* api for user login 
@Route POST /user/login
@access public
@ params request , response 
*/
const login = async (req , res) => {
  const bodyData = req.body;

  /* Checking Email and Phone Number from the Database */
  const result1 = await findOne( User , {email : bodyData.email}); // always true if search with phoneno
  const result2 = await findOne( User , {phoneNo : bodyData.phoneNo}); //  always true if search with email
  if(!(result1 && result2)){
    const msg = bodyData.email ? message.NOT_A_VALID_EMAIL : message.NOT_A_VALID_PHONE_NUMBER;
    return res.status(400).json({ StatusCode : 400,  msg   });
  }
  const userData = bodyData.email ? result1 : result2 ;
   /* Checking Password from the Database */
  if(userData.password !== hashPassword(bodyData.password)){
     return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_PASSWORD,  });
  } 
  /* add token in body */
  let token = jwt.sign({id : userData._id} , secretKey );
  await findOneAndUpdate(User , {_id : userData._id} , {token});
  return res.status(200).json({ StatusCode : 200,  msg : message.LOGIN,  });
  };

  /* api for user update 
@Route PUT /user/update
@access public
@ params request , response 
*/
const update = async ( req , res ) => {
	const bodyData = req.body;

  /* Checking Email and Phone Number from the Database */
  const result1 = await findOne( User , {email : bodyData.email}); 
  const result2 = await findOne( User , {phoneNo : bodyData.phoneNo}); 
  if(bodyData.phoneNo || bodyData.email){
    if((result1 && result2)){
      const msg = bodyData.email ? message.NOT_A_VALID_EMAIL : message.NOT_A_VALID_PHONE_NUMBER;
      return res.status(400).json({ StatusCode : 400,  msg   });
    }
  }
  if(bodyData.password){
     /* Checking Password from the Database */
    if(bodyData.result.password === hashPassword(bodyData.password)){
       return res.status(400).json({ StatusCode : 400,  msg : message.CURRENT_PASSWORD,  });
    }
    await findOneAndUpdate(User , {_id : req.body.result._id} , {password : hashPassword(bodyData.password)})
  }
  /* update the user data */
  await findOneAndUpdate(User , {_id : req.body.result._id} , {
    name : bodyData.name ,
    email : bodyData.email ,
    phoneNo : bodyData.phoneNo,
    address : bodyData.address ,
    pinCode : bodyData.pinCode,
    city : bodyData.city,
    state : bodyData.state
  })

  return res.status(200).json({ StatusCode : 200,  msg : message.UPDATE  });
};



  /* api for user profilePic 
@Route PATCH /user/profilePic
@access public
@ params request , response 
*/
const profilePic = async (req ,res) => { 
  if(req.body.method === "remove"){
    await findOneAndUpdate( User , {_id : req.body.result._id} , {$set : {profilePic : "public/image-1680266344141.jpg"}});
		return res.status(200).json({statusCode : 200 , msg : message.REMOVE});
  }else{
    if(req.file){
    await findOneAndUpdate( User , {_id : req.body.result._id} , {$set : {profilePic : req.file.path}});
    return res.status(200).json({statusCode : 200 , msg : message.UPDATE_PROFILE_PIC});
    }else{
      return res.status(400).json({statusCode : 400 , msg : message.PROVIDE_PIC});
    }
  }
};

/* api for user show 
@Route GET /user/show
@access public
@ params request , response 
*/
const show = async ( req ,res) => {
	delete req.body.result.token ;
  delete req.body.result.createdAt;
  delete req.body.result.updatedAt;
  delete req.body.result._id;
  delete req.body.result.OTP;
  return res.status(200).json({statusCode : 200  , yourData : req.body.result} );
};


/* @desc api for generateOTP
@route GET  /generateOTP
@access Public
@ param req , res
 */

const generateOTP = async (req , res) => {
  const bodyData = req.body;
  /* Checking Email and Phone Number from the Database */
  const result1 = await findOne( User , {email : bodyData.email}); 
  const result2 = await findOne( User , {phoneNo : bodyData.phoneNo});
  if(!(result1 && result2)){
    const msg = bodyData.email ? message.NOT_A_VALID_EMAIL : message.NOT_A_VALID_PHONE_NUMBER;
    return res.status(400).json({ StatusCode : 400,  msg   });
  }
  const userData = bodyData.email ? result1 : result2 ;
  const OTP = Math.trunc(Math.random() *1000000);
  await findOneAndUpdate(User , {_id : userData._id} , {$set : {OTP}});
  return res.status(200).json({statusCode : 200 , OTP});
};

/*  @desc api for forgetPassword
@route POST  /forgetPassword
@access Public
@ param req , res
 */
const forgetPassword = async (req ,res ) => {
  let check = await User.findOne({email : req.body.email });
  /* check Email for the database */
  if( !(check)){
    return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_EMAIL   });
  }
  /* check otp field in database */
  if(check.OTP === undefined){
      return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_EMAIL   });
  }
  /* check otp in email */
  check = await findOne(User , {_id : check._id  , OTP : req.body.OTP});
  if(!check){
    return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_OTP  });
  }
  /* update password */
  await findOneAndUpdate(User , {_id : check._id} , {$set : {password : hashPassword(req.body.password)}});
  await findOneAndUpdate(User , {_id : check._id} , {$unset : {OTP : ""}});
  return res.status(200).json({statusCode : 200 , msg : message.UPDATE_PASSWORD});
}

/*  @desc api for logout
@route GET  /logout
@access Public
@ param req , res
 */
const logout = async ( req , res) => {
   await findOneAndUpdate(User , {_id : req.body.result._id} , {$unset : {token : ""}})
   return res.status(200).json({statusCode : 200 , msg : "logout"});
};




module.exports = { 
    signup ,
    login,
    update,
    show,
    profilePic,
    generateOTP,
    forgetPassword,
    logout
};

