const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

/* validation of carts */
const cartAddproductSchema = joi.object({
    productId :  joi.objectId().required(),
});

module.exports = {cartAddproductSchema};