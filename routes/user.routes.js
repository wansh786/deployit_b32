const {UserModel}=require("../models/user.model");
const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"error":err})
            }
            else{
                const user=new UserModel({username,email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"The new user has been registered","newregistratin":user})
            }
        })
        
    } catch (error) {
        res.status(400).send({"error":error})
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,username:user.username},"masai")
                    // const refresh_token=jwt.sign({hero:"batman"},"school",{
                    //     expiresIn:120
                    // })
                    res.status(200).send({"msg":"Login Successfull!","token":token})
                }
                else{
                    res.status(200).send({"msg":"Wrong Crendiatials!"})
                } 
            }) 
        }
        else{
            res.status(200).send({"msg":"User Does not exit,please Register!"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
}) 

module.exports={
    userRouter
}