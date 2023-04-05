const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId : mongoose.Types.ObjectId,
    userId : mongoose.Types.ObjectId,
} , { timestamps : true , versionKey : false , collection : "Cart" } );

const Cart = new mongoose.model( "C" , cartSchema);

module.exports = { Cart };