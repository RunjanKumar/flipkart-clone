const { search  , pagination } = require("../service/mongooseService");
const { Product } = require('../Model/productModel');
const message = require("../utils/message");

/* api for showProduct 
@Route GET /showProduct
@access public
@ params request , response 
*/
const showProduct = async ( req , res) => {
    const page = req.body.page ?? 1 ;
    const limit =  req.body.limit ?? 10;
    const skip =    (page - 1) * limit;
    const result = await pagination(Product , skip , limit);
    if(result.length === 0){
        return res.status(400).json({statusCode : 400 , msg : message.PAGE_LIMIT});
    }
    return res.status(200).json({statusCode : 200 , result});
 };

/* api for searchProductByCategory 
@Route GET /searchProductByCategory
@access public
@ params request , response 
*/
const searchProductByCategory = async (req , res ) => {
     /* checking category */
    const result = await search(Product , { productCategory: req.body.productCategory } , );
    if(result.length === 0){
        return res.status(200).json({statusCode : 200 , msg : message.NOT_A_VALID_CATEGORY});
    }
    return res.status(200).json({statusCode : 200 , result});
};

/* api for searchProductByDiscount 
@Route GET /searchProductByDiscount
@access public
@ params request , response 
*/
const searchProductByDiscount = async (req , res ) => {
    /* checking category */
    let result = await search(Product , { productCategory: req.body.productCategory } , );
    if(result.length === 0){
        return res.status(200).json({statusCode : 200 , msg : message.NOT_A_VALID_CATEGORY});
    }
    if(req.body.filter === 'greater'){
        /* checking discount */
     result = await search(Product , { productCategory: req.body.productCategory , productDiscount: {$gte : req.body.productDiscount} } , );
     if(result.length === 0){
         return res.status(400).json({statusCode : 400 , msg : message.NOT_A_VALID_PRODUCT});
     }
     return res.status(200).json({statusCode : 200 , result});
    }else{
        /* checking discount */
     result = await search(Product , { productCategory: req.body.productCategory , productDiscount: {$lte : req.body.productDiscount} } , );
     if(result.length === 0){
         return res.status(400).json({statusCode : 400 , msg : message.NOT_A_VALID_PRODUCT});
     }
     return res.status(200).json({statusCode : 200 , result});
    }
};


/* api for searchProductBySize 
@Route GET /searchProductBySize
@access public
@ params request , response 
*/
const searchProductBySize = async (req , res) => {
      /* checking category */
    let result = await search(Product , { productCategory: req.body.productCategory } , );
    if(result.length === 0){
        return res.status(200).json({statusCode : 200 , msg : message.NOT_A_VALID_CATEGORY});
    }
    /* checking size  */
    result = await search(Product , { productCategory: req.body.productCategory , productSize: req.body.productSize});
    if(result.length === 0){
      return res.status(400).json({statusCode : 400 , msg : message.NOT_A_VALID_PRODUCT});
    }
    return res.status(200).json({statusCode : 200 , result});        
};


 module.exports = { showProduct , searchProductByCategory  , searchProductByDiscount , searchProductBySize};




