require("dotenv").config();
const express = require("express");
const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const path = require("path");
const port = process.env.PORT || 2001;
const publicPath = path.join(__dirname, "/public/template/index.html");

/* Importing route modules */
const userRouter = require("./Router/userRoute");
const { connection } = require("./service/mongooseService");
const shopkeeperRoute = require("./Router/shopkeeperRoute");
const commonRoute = require("./Router/commonRoute");
const cartRoute = require("./Router/cartRoute");

/* connect to the Database */
const connect = async () => {
  await connection();
};
connect();

/* Socket connection */
 io.on('connection', function(socket){
   console.log('A user connected');

   socket.on('setUsername', function(data){
      socket.emit('userSet', {username: data}); 
   });
   socket.on('msg', function(data){
    
    //Send message to everyone
    io.emit('newmsg', data);
   });

   socket.on('disconnect' , () => {
    console.log("user disconnected");
   });
});
 

/* MiddleWares */ 
app.use(express.json());

app.use("/", commonRoute);

app.use("/customercare", express.static(publicPath));

app.use("/user", userRouter);
app.use("/shopkeeper", shopkeeperRoute);
app.use("/cart", cartRoute);

http.listen(port, (err) => {
  if (err) console.log(err.message);
  console.log(`server is listening on ${port}`);
});
