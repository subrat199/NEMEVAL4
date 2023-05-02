const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    gender:{type:String,require:true},
},{
    versionKey:false
})

const userModel = mongoose.model('User',userSchema)

module.exports={
    userModel
}