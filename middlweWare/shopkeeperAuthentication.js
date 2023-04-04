const message = require("../utils/message");


function shopkeeperAuthentication() {
        return (req , res , next) => {
            if(req.body.result.role === 'user' || req.body.result.role === 'deliveryBoy'){
                return res.status(400).json({statusCode : 400 , msg : message.USER_IS_NOT_ALLOWED});
            }else{
                next();
                return;
            }
        };
}
module.exports =  { shopkeeperAuthentication };