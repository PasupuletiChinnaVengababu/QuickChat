// get all users except logged user

import cloudinary from "../lib/cloudinary.js";
import { messageModel } from "../models/Message.js";
import { userModel } from "../models/User.js";
import { io, userSocketMap } from "../server.js";

export const getUsersSidebar= async(req,res)=>{
    try{
        const userId=req.user._id;
        const filteruser= await userModel.find({_id: {$ne:userId}}).select("-password");
        // count numbwr of msgs not seen.
        const unseenMessages={};
        const promises=filteruser.map(async (user)=>{
            const messages=await messageModel.find({senderId:user._id, receiverId:userId,seen:false})
            if(messages.length>0){
                unseenMessages[user._id]=messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteruser,unseenMessages})

    }
    catch(error){
        console.log(error.message);
         res.json({success:false,message:error.message})
    }
}
//  get all messages for selected user.
export const getMessage=async(req,res)=>{
    try{
        const {id:selecteduserId}=req.params;
        const myId=req.user._id;
        const messages=await messageModel.find({
            $or:[
                {senderId:myId, receiverId:selecteduserId},
                 {senderId:selecteduserId, receiverId:myId},
            ]
        })
        await messageModel.updateMany({senderId:selecteduserId, receiverId:myId,seen:true});
        res.json({success:true, messages})

    }
    catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }

}
//api to mark as seen using messageId

export const markMessageSeen=async()=>{
    try{
        const {id}=req.params;
        await messageModel.findByIdAndUpdate(id,{seen:true})
        res.json({
            success:true
        })
    }
   catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }
}

//send message to selected user
export const sendMessage =async()=>{
    try{
        const{image,text}=req.body;
        const receiverId=req.params.id;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl=upload.secure_url;
        }
        const newMessage=await messageModel.create({
            receiverId,
            senderId,
            image:imageUrl,
            text
        })
        const receiverSocketId=userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.json({success:true,newMessage})
    }
    catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})
    }
}