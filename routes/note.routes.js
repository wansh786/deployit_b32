const express=require("express");
// const {limiter}=require("../middlewere/rateLimit")
const bcrypt=require("bcrypt");
const {NoteModel}=require("../models/note.model");
const jwt= require("jsonwebtoken");
const {auth}=require("../middlewere/auth.middlewere");
const noteRouter=express.Router();


noteRouter.use(auth);
// noteRouter.use(limiter) 

noteRouter.post("/add",async(req,res)=>{
    try {
        let note=new NoteModel(req.body);
        await note.save()
        res.status(200).send({"msg":"post added","addedPost":note})
    } catch (error) {
        res.status(400).send({"erroe":`${error}`})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        let note=await NoteModel.find({userID:req.body.userID});
        res.status(200).send({"data":note})
    } catch (error) {
        res.status(400).send({"erroe":`${error}`}) 
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    try {
        const note=await NoteModel.findOne({_id:id})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":`Note with Id:${id} has been updated`})
        }
        else{
            res.status(200).send({"msg":`You are not authorised...!`}) 
        }
    } catch (error) {
        res.status(400).send({"erroe":`${error}`}) 
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    try {
        const note=await NoteModel.findOne({_id:id})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":`Note with Id:${id} has been deleted`})
        }
        else{
            res.status(200).send({"msg":`You are not authorised...!`}) 
        }
    } catch (error) {
        res.status(400).send({"erroe":`${error}`}) 
    }
})


module.exports={
    noteRouter
}  

