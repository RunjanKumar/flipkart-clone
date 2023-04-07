const {  save ,findOne, findOneAndUpdate, findOneAndDelete, find } = require("../service/mongooseService");
const { Product } = require('../Model/productModel');
const { Cart } = require("../Model/cartModel");
const message = require("../utils/message");

/* api for addProductInCart
@Route POST /cart/addProductInCart
@access public
@ params request , response 
*/
const addProductInCart = async (req , res) => {
    let bodyData = req.body;
    /* check productID is valid or not */
    let result = await findOne(Product , {_id : req.body.productId});
    let productPrice = result.productDiscountPrice;
    console.log(productPrice); 
    if(!result){
        return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_PRODUCT});
    }
    /* same product increment by 1 */
    result = await findOne(Cart, {productId : req.body.productId , userId : bodyData.result._id });
    if(result){
        result = await findOneAndUpdate(Cart, {productId : req.body.productId , userId : bodyData.result._id } , {$inc : {productQuantity : 1}});
        return res.status(200).json({ StatusCode : 200,  Quantity : result.productQuantity});
    }
    const document = new Cart({ productId : bodyData.productId , userId : bodyData.result._id } );
    document.productPrice = productPrice;
    await save(document);
    return res.status(200).json({ StatusCode : 200,  msg : message.ADD_PRODUCT });
};

/* api for removeProductInCart
@Route DELETE /cart/removeProductInCart
@access public
@ params request , response 
*/
const removeProductInCart = async (req , res) => {
    let bodyData = req.body;
    /* remove product */
    result = await findOne(Cart, {productId : req.body.productId , userId : bodyData.result._id });
    if(result){
        if(result.productQuantity > 2){
            result = await findOneAndUpdate(Cart, {productId : req.body.productId , userId : bodyData.result._id } , {$inc : {productQuantity : -1}});
            return res.status(200).json({ StatusCode : 200,  Quantity : result.productQuantity});
        }else{
            await findOneAndDelete(Cart , {productId : req.body.productId , userId : bodyData.result._id } );
            return res.status(200).json({ StatusCode : 200,  msg : message.PRODUCT_REMOVE_FROM_CART});
        }
        
    }else{
        return res.status(400).json({ StatusCode : 400,  msg : message.PRODUCT_NOT_IN_CART});
    }
    
};

/* api for showcart
@Route GET /cart/showcart
@access public
@ params request , response 
*/
const showcart = async (req, res) => {
    const result = await find(Cart , { userId : req.body.result._id});
    if(result.length === 0){
        return res.status(200).json({ StatusCode : 200,  msg : message.CART_EMPTY});
    }
    return res.status(200).json({ StatusCode : 200,  result});
};



module.exports = {addProductInCart , removeProductInCart , showcart};