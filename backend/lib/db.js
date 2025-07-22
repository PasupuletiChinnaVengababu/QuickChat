import mongoose from "mongoose";
  export const coonectDb= async()=>{
    try{
       await mongoose.connect(process.env.Mongo_URL)
    }
    catch(error){
        console.log(error)
    }
  }