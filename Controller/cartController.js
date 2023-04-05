const {  save ,findOne } = require("../service/mongooseService");
const { Product } = require('../Model/productModel');
const { Cart } = require("../Model/cartModel");
const message = require("../utils/message");

/* api for addProductInCart
@Route GET /cart/addProductInCart
@access public
@ params request , response 
*/
const addProductInCart = async (req , res) => {
    let bodyData = req.body;
    /* check productID is valid or not */
    let result = await findOne(Product , {_id : req.body.productId});
    if(!result){
        return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_PRODUCT});
    }
    /* same product cannot be added */
    result = await findOne(Cart, {productId : req.body.productId , userId : bodyData.result._id });
    if(result){
        return res.status(400).json({ StatusCode : 400,  msg : message.PRODUCT_ADDED});
    }
    const document = new Cart({ productId : bodyData.productId , userId : bodyData.result._id } );
    await save(document);
    return res.status(200).json({ StatusCode : 200,  msg : "add" });
};

module.exports = {addProductInCart };