const joi = require('joi');
 joi.objectId = require('joi-objectid')(joi);




/* validation for addProduct */
const addproductSchema = joi.object({
    productName : joi.string().max(30).required(),
    productRealPrice : joi.number().required(),
    productDiscountPrice : joi.number(),
    productDiscount : joi.number(),
    productStock : joi.string().valid("inStock" , "outOfStock"),
    productSize : joi.string().valid("s" , "m" , "l" , "xl" ,"xxl"),
    productTitle : joi.string().min(5).max(50).required(),
    productDescription : joi.string().min(5).max(500).required(),
});

/* validation for deleteProduct */
const deleteProductSchema = joi.object({
    _id: joi.objectId().required(),
});

/* validation for updateProduct */
const updateProductSchema = joi.object({
    _id: joi.objectId().required(),
    productName : joi.string().max(30),
    productPrice : joi.number(),
    productDiscount : joi.number(),
    productStock : joi.string().valid("inStock" , "outOfStock"),
    productSize : joi.string().valid("s" , "m" , "l" , "xl" ,"xxl"),
    productTitle : joi.string().min(5).max(50),
    productDescription : joi.string().min(5).max(500),
    productImage : joi.string(),
}).min(2);

module.exports = { addproductSchema , deleteProductSchema , updateProductSchema};