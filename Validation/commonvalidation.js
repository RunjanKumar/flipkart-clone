const joi = require('joi');

/* validation for showProduct */
const showProductSchema = joi.object({
     page : joi.number().integer().min(1),
     limit : joi.number().integer().min(1),
});

/* validations for searchProduct*/
const searchProductByCategorySchema = joi.object({
     productCategory : joi.string().min(1).max(50).required(),
});

const searchProductByDiscountSchema = joi.object({
     productCategory : joi.string().min(1).max(50).required(),
     filter : joi.string().valid("less" , "greater").default("greater"),
     productDiscount : joi.number().min(0).max(100).required(),
});

const searchProductBySizeSchema = joi.object({
     productCategory : joi.string().min(1).max(50).required(),
     productSize : joi.string().valid("s" , "m" , "l" , "xl" ,"xxl").required(),
});



module.exports = { showProductSchema , searchProductByCategorySchema ,
      searchProductByDiscountSchema,
      searchProductBySizeSchema
     };