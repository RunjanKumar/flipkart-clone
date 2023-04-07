const message = require("../utils/message");
const { Product } = require('../Model/productModel');
const { save, findOne, findOneAndDelete , findOneAndUpdate } = require("../service/mongooseService");
const { discount } = require('../utils/commonFunction');
/* api for shopkeeper addProduct 
@Route POST /shopkeeper/addProduct
@access public
@ params request , response 
*/
const addProduct = async(req , res) => {
    const id = req.body.result._id;
    delete req.body.result;
    const bodyData = req.body;
    const document = new Product(bodyData);
    document.productOwner = id;
    document.productDiscountPrice = bodyData.productRealPrice - discount(bodyData.productRealPrice , bodyData.productDiscount);
    if(req.file){
        document.productImage = req.file.path;
    }else{
        return res.status(400).json({ StatusCode : 400,  msg : message.ADD_IMAGE });
    }
   
    await save(document);
    return res.status(200).json({ StatusCode : 200,  msg : message.ADD_PRODUCT });
};

/* api for shopkeeper deleteProduct 
@Route POST /shopkeeper/deleteProduct
@access public
@ params request , response 
*/
const deleteProduct = async( req ,res) => {
    let result = await findOne(Product , {_id : req.body._id});
    /* product id is wrong */
    if(!result){
        return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_PRODUCT});
    }
    /* match  the ownership of the product */
    if(String(req.body.result._id) === String(result.productOwner)){
        await findOneAndDelete(Product , {_id : req.body._id});
        return res.status(200).json({ StatusCode : 200,  msg : message.DELETE_PRODUCT});
    } 
    return res.status(400).json({ StatusCode : 400,  msg : message.NO_ACCESS_TO_DELETE});
};

/* api for shopkeeper updateProduct 
@Route POST /shopkeeper/updateProduct
@access public
@ params request , response 
*/
const updateProduct = async (req , res) => {
    let result = await findOne(Product , {_id : req.body._id});
    /* product id is wrong */
    if(!result){
        return res.status(400).json({ StatusCode : 400,  msg : message.NOT_A_VALID_PRODUCT});
    }
    /* match  the ownership of the product */
    if(String(req.body.result._id) === String(result.productOwner)){
        if(req.file){
            await findOneAndUpdate(Product , {_id : req.body._id} ,{productImage : req.file.path}); 
        }
        await findOneAndUpdate(Product , {_id : req.body._id} , {
            productName : req.body.productName,
            productPrice : req.body.productPrice,
            productStock : req.body.productStock,
            productCategory : req.body.productCategory,
            productSize : req.body.productSize,
            productTitle : req.body.productTitle,
            productDescription : req.body.productDescription
        });
        return res.status(200).json({ StatusCode : 200,  msg : message.UPDATE});
    } 
    return res.status(400).json({ StatusCode : 400,  msg :"update"});
};





module.exports = {addProduct , deleteProduct , updateProduct};