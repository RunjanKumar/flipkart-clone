require('dotenv').config();
const express = require('express');


const port =  process.env.PORT || 2001;

const app = express();

/* Importing route modules */
const userRouter = require('./Router/userRoute');
const { connection } = require('./service/mongooseService');
const { shopkeeperRoute } = require('./Router/shopkeeperRoute');


/* connect to the Database */
const connect = async () => {
    await connection();
};
connect();


/* MiddleWares */
app.use(express.json());

app.use('/user' , userRouter);
app.use('/shopkeeper' , shopkeeperRoute);

app.listen(port , (err) => {
        if(err) console.log(err.message);
    console.log(`server is listening on ${port}`);
});









