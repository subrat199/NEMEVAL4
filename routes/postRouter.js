
const {request}=require("express")
const express = require("express")
const { postModel } = require("../model/postModel")
const { authenticate } = require("../middleWare/authMiddlewere")

const postRouter=express.Router()

postRouter.get('/',authenticate,async (req,res)=>{
    const {device}=req.query
    // console.log(device)
    try {
        let userID=req.body.userID
        const data=await postModel.find({userID:userID})
        if(device===undefined){
            res.send(data)
        }else{
            let filterdata=data.filter((el)=>{
                return el.device===device
            })
            res.send(filterdata)
        }
    } catch (error) {
        console.log(error)
    }
})
postRouter.post("/create",async(req, res)=>{
    const payload=req.body
    try {
        const post=new postModel(payload)
        await post.save()
        res.send("Post created successfully")
    } catch (error) {
        console.log(error)
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        const post=await postModel.findByIdAndUpdate({_id:id},payload)
        res.send("Post updated successfully")
    } catch (error) {
        console.log(error)
    }
})
postRouter.delete("/delete/:id",async (req,res)=>{
    let id = req.params.id
    try {
        const post=await postModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Post deleted successfully"})
    } catch (error) {
        console.log(error)
    }
})
module.exports={
    postRouter
}