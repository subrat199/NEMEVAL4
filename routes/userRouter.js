const mongoose=require('mongoose');
const express=require('express');
const { userModel } = require('../model/userModel');
const bcrypt=require('bcrypt');
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
require('dotenv').config()
userRouter.get("/",(req,res)=>{
    res.status(200).send("Successfully get data");
})
userRouter.post("/register",(req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        bcrypt.hash(password,5,async (err,secure_password)=>{
            if(err){
                console.log(err);
            }else{
                const user=new userModel({email,password:secure_password,name,gender})
                await user.save()
                res.send({"msg":"Registered"})
            }
        })
       
    } catch (error) {
        res.send("Error While Registering")
        console.log(error)
    }
})
userRouter.post("/login", async (req,res)=>{
    let {email,password}=req.body
    try {
        const user=await userModel.find({email:email})
        // console.log(user)
        const hash_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hash_pass, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID:user[0]._id} , 'masai');
                    res.send({"msg":"login Sucessful","token":token})
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
            
        }else{
            res.send("Wrong credentials")
        }      
    } catch (error) {
        console.log(error)
    }
})
module.exports={
    userRouter
}