const mongoose = require('mongoose');

/* Importing files */
const message = require('../utils/message');


/* Connection service */
const connection = async ( ) => {
    await mongoose.connect('mongodb://localhost:27017/flipkart')
   .then(() => {console.log(message.SUCCESSFULLY_CONNECTED_TO_DB);})
   .catch((err) => {
    console.log(err.message);
    return ;
   });
};

/* save service */
const save = async (document) => {
   await document.save();
};


/* create service */
const create = async (collection , document)  => {
   await  collection.create(document);
};

/* find service */
const findOne = async (collection , Query)  => {
   return await collection.findOne(Query).lean();
};

/* update service */
const findOneAndUpdate = async ( collection , Query , updateData)   => {
    return await  collection.findOneAndUpdate(Query , updateData , {new : true});
};

/* delete service */
const findOneAndDelete = async ( collection , Query , deleteData)   => {
   return await  collection.findOneAndDelete(Query , deleteData , {new : true});
};

module.exports = { create , connection , findOne , save , findOneAndUpdate , findOneAndDelete};

