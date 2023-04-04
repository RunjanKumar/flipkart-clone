const { pbkdf2Sync } = require('crypto');


/* hashPassword Function */
const hashPassword = (str) => {
    return pbkdf2Sync(str , 'salt' , 100000, 64 , 'sha512').toString('hex');
};

/* Discount Function */
const discount = (number , percentage) => {
       return (number * percentage)/100;
};

/* Exporting modules */
module.exports = {hashPassword , discount };