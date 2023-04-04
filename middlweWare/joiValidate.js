/* joi Validation Function */
function joiValidate(schema){
    return (req , res , next) => {
        const result = schema.validate(req.body);
        if(result.error) {
            return res.status(400).json({ StatusCode : 400 ,  msg : result.error.message, });
        }else{
            req.body = result.value ;
            next();
        }
    };
}
module.exports = { joiValidate };