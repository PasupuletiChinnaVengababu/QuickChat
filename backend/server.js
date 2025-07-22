import express from "express"
import 'dotenv/config';
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { coonectDb } from "./lib/db.js";
import userRouter from "./Routes/userRouter.js";

await coonectDb();
const app=express();
app.use(cors());
app.use(express.json())
const server=http.createServer(app);
app.use("/api/status",(req,res)=>{
    res.send("Message reecived");
})
app.use("/api",userRouter)
server.listen(3000,()=>{
    console.log("http://localhost:3000")
})