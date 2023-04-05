const express = require('express');


const cartRoute = express.Router();

/* Importing files */
const { joiValidate} = require('../middlweWare/joiValidate');
const { cartAddproductSchema } = require('../Validation/cartValidation');
const { addProductInCart } = require('../Controller/cartController');
const { userAuthentication } = require('../middlweWare/userAuthentication');

/* all Routes of cart*/
cartRoute.route('/addproductincart').post(  joiValidate(cartAddproductSchema) , userAuthentication(), addProductInCart );


module.exports = cartRoute ;