const multer = require("multer");
const path = require('path');


/* storage engine */

const storage = multer.diskStorage({
  destination: "./public/productImage",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" +file.originalname 
    );
  },
});


const productUpload = multer({ 
   storage: storage,
   limits: { fileSize: 2000000 } ,
   fileFilter : function(req , file , cb){
          const fileTypes = /jpeg|jpg|png/;
          const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
          const mimeType = fileTypes.test(file.mimetype);
          if( extname && mimeType){
              return cb(null,true);
          }else{
              return req.res.status(400).json({ statusCode : 400 ,Error : "jpg and png only allowed"});
          }
      }}).single("image");
 
module.exports = { productUpload };