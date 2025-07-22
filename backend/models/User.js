import mongoose from "mongoose";
const Schema=mongoose.Schema;
const userSchema=new Schema({
    fullname:{type:String,required:true, unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlengtg:6},
    profilePic:{type:String,default:""},
    bio:{type:String}
},{timestamps:true})

export const userModel=mongoose.model("User",userSchema)
