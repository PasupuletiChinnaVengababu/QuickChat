import express from "express"
import { checkAuth, Login, Signup, updateProfile } from "../controller/userController.js";
import { protectroute } from "../middleware/auth.js";
const userRouter=express.Router();
userRouter.post("/Signup",Signup)
userRouter.post("/login",Login)
userRouter.put("/update-user",protectroute,updateProfile)
userRouter.get("/all",protectroute,checkAuth)

export default userRouter