const jwt=require("jsonwebtoken");
require('dotenv').config()
const authenticate=(req,res,next) => {
    const token=req.headers.authorization
    if(token){
        const decode=jwt.verify(token,"masai")
        if(decode){
            const userID=decode.userID
            req.body.userID=userID
            next()
        }else{
            res.send("Please login first")
        }
    }else{
        res.send("Please login first")
    }
}
module.exports={
    authenticate
}