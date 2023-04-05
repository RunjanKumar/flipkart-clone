const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productOwner : mongoose.Types.ObjectId,
    productName : String,
    productRealPrice : Number,
    productDiscountPrice : Number,
    productTitle : String,
    productCategory : String,
    productDescription : String,
    productSize : String,
    productDiscount : Number,
    productStock : {
        type : String,
        default : "inStock"
    },
    productImage: String,
} , { timestamps : true , versionKey : false , collection : "Product" } );

const Product = new mongoose.model( "p" , productSchema);

module.exports = { Product };