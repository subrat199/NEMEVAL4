const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const cors=require('cors');
const { authenticate } = require("./middleWare/authMiddlewere");
const { postRouter } = require("./routes/postRouter");
const app = express();

require("dotenv").config();
app.use(cors())
app.use(express.json());
 
app.use("/users",userRouter)

app.use(authenticate)

app.use("/posts",postRouter)
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("Server listening on port " + process.env.PORT);
});
