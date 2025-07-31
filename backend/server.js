import express from "express"
import 'dotenv/config';
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { coonectDb } from "./lib/db.js";
import userRouter from "./Routes/userRouter.js";
import messageRouter from "./Routes/messageRoutes.js";
import { Server } from "socket.io";


await coonectDb();
const app=express();
app.use(cors());
app.use(express.json())
const server=http.createServer(app);
export const io=new Server(server,{
    cors:{origin:"*"}
})

export const userSocketMap={}; // {userID:socketId}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("user connected",userId);
    if(userId){
        userSocketMap[userId]=socket.io;
    }
     io.emit("getOnlineUsers",Object.keys(userSocketMap));
      socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        // 5. Remove the disconnected user from the userSocketMap
         // Ensure correct user/socket is removed
            delete userSocketMap[userId];
        
        // 6. Emit the updated list of online users to all remaining clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
     
})
app.use("/api/status",(req,res)=>{
    res.send("Message reecived");
})
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)
server.listen(3000,()=>{
    console.log("http://localhost:3000")
})