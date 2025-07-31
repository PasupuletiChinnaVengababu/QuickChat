import mongoose from "mongoose";
const Schema=mongoose.Schema;
const messageSchema=new Schema({
  senderId:{type:Schema.Types.ObjectId,ref:"User"},
  receiverId:{type:Schema.Types.ObjectId,ref:"User"},
  text:{type:String},
  image:{type:String},
  seen:{type:Boolean,default:false}
},{timestamps:true})

export const messageModel=mongoose.model("Messag",messageSchema)
