import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
const JWT_KEY="!))XDEV>COM"

export const protectroute=async(req,res,next)=>{
    try{
        const token=req.headers.token;
        const decodedData=jwt.verify(token,JWT_KEY)
        const user=await userModel.findById(decodedData.userId).select("-password");
        if(!user){
            res.json({message:"usernot found"})
        }
        req.user=user;
        next();
    }
    catch(error){
        res.json({message:"Error"})
    }

}