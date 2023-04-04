const message = require("../utils/message");
const jwt = require('jsonwebtoken');

/* importing modules */
const {  findOne  } = require('../service/mongooseService');
const { User } = require('../Model/userModel');

/* middleWare for user authentication */
const secretKey = process.env.SECRET_KEY || 'runjan' ;
function userAuthentication(){
     return async (req , res , next) => {
        try{
            if(!req.headers.token){
                return res.status(400).json({ StatusCode : 400,  msg : message.EMPTY_TOKEN,  });
            }
            const decode = jwt.verify(req.headers.token , secretKey); 
            /* check user in  database */
            const result1 = await findOne( User , {_id : decode.id});
            if((result1)){
                if(!result1.token){
                    return res.status(400).json({ StatusCode : 400,  msg : message.LOGOUT});
                }
                req.body.result = result1 ;
                next();
                return;
            }
            return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_USER,  });
        }catch(err){
            return res.status(400).json({ StatusCode : 400,  Error : err.message  });
        }
     };
}

module.exports = { userAuthentication };