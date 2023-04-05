const express = require('express');

const commonRoute = express.Router();

/* Importing modules */
const { joiValidate } = require('../middlweWare/joiValidate');
const { showProductSchema, searchProductByCategorySchema, searchProductByDiscountSchema, searchProductBySizeSchema } = require('../Validation/commonvalidation');
const { showProduct, searchProductByCategory , searchProductByDiscount , searchProductBySize} = require('../Controller/commonController');



/* All routes of users */
commonRoute.route('/showproduct').get(joiValidate(showProductSchema) , showProduct );
commonRoute.route('/searchproductbycategory').get( joiValidate(searchProductByCategorySchema) ,  searchProductByCategory );
commonRoute.route('/searchproductbydiscount').get( joiValidate(searchProductByDiscountSchema) ,  searchProductByDiscount);
commonRoute.route('/searchproductbysize').get(   searchProductBySize);
module.exports = commonRoute ;