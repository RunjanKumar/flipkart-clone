const express = require('express');
const shopkeeperRoute = express.Router();

/* Importing files */
const { addProduct, deleteProduct , updateProduct} = require('../Controller/shopkeeperController');
const { joiValidate} = require('../middlweWare/joiValidate');
const { addproductSchema , deleteProductSchema, updateProductSchema } = require('../Validation/productValidation');
const { shopkeeperAuthentication } = require('../middlweWare/shopkeeperAuthentication');
const { userAuthentication } = require('../middlweWare/userAuthentication');
const { productUpload } = require('../middlweWare/productMulter');


/* all routes for shopkeeper */
shopkeeperRoute.route('/addproduct').post( productUpload ,joiValidate(addproductSchema) ,  userAuthentication() ,  shopkeeperAuthentication(),  addProduct);
shopkeeperRoute.route('/deleteproduct').post( joiValidate(deleteProductSchema) ,  userAuthentication() ,  shopkeeperAuthentication(),  deleteProduct);
shopkeeperRoute.route('/updateproduct').post(productUpload , joiValidate(updateProductSchema) ,  userAuthentication() ,  shopkeeperAuthentication(),  updateProduct);


module.exports = { shopkeeperRoute};
