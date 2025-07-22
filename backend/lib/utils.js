import jwt from "jsonwebtoken"
const JWT_KEY="!))XDEV>COM"
export const generateToken=(userId)=>{
    const token =jwt.sign({userId},JWT_KEY)
    return token;
}