import express from "express";
import { userModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const Signup = async (req, res) => {
//   const {fullname, email, password, bio } = req.body;
    const fullname=req.body.fullname;
    const email=req.body.email;
    const password=req.body.password;
    const bio=req.body.bio;

  try {
    if (!fullname || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already  existed" });
    }
    const salt = await bcrypt.genSalt(10);
    const hpassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hpassword,
      bio,
    });
    const token = generateToken(newUser._id);
    res.json({ success:true,user:newUser, token, message: "Succesfull created account" });
    console.log("hello")
  } 
  catch (error) {
    res.json({
      message: "Succesfull not having some issuses while creating the account",
    });
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      res.jon({ success:false,Message: "success" });
    }
    const token = generateToken(user._id);
    res.json({success:true, user, token, message: "Succesfull login into the account" });
  } catch (error) {
    res.json({ message: "Having some issuses while loging into the account" });
  }
};
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  const { profilePic, bio, password } = req.body;
  console.log(bio);
  try {
    if (!profilePic) {
      const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
        bio,
        password,
      });
    
    return res.json({success:true,updateUser})
    }
    const upload = await cloudinary.uploader.upload(profilePic);
    const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
      bio,
      password,
      profilePic: upload.secure_url,
    });
    res.json({success:true,updateUser})
    
  } 
  catch(error) {
    console.log("error",error);
  }
};
