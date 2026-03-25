const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { authenticate } = require("../Middlewares");
const { Projects } = require("../db");
const router = express.Router();

router.get("/all",authenticate,async (req,res)=>{
    try{
        const project = await Projects.find({
        userId:req.userId
        });
        res.json({
            project
        });
    }catch(err){
        res.status(500).json({
            message:"Error in extracting project"
        })
    }
})

router.post("/add",authenticate, async(req,res)=>{
    try{
        const { clientName, title, description, status, paymentStatus, amount, deadline } = req.body;
        const project = await Projects.create({
            userId:req.userId,
            clientName,
            title,
            description,
            status,
            paymentStatus,
            amount,
            deadline
        });
        res.json({
            message:"Added"
        });
    }catch(err){
        res.status(500).json({
            message:"There is something wrong"
        })
    }
})

router.post("/update/:id",authenticate,async(req,res)=>{
    try{
        const projectId = req.params.id;

        const updatedProject = await Projects.findOneAndUpdate({
            _id:projectId,
            userId:req.userId
        },{
            $set:req.body
        },{
            new:true
        });

        if(!updatedProject){
            return res.status(400).json({
                message:"Project not found"
            })
        }
        res.json({
            message:"Project altered successfully",
            project:updatedProject
        })
    }catch(err){
        return res.status(400).json({
            message:"Error updating project"
        })
    }
})

router.delete("/delete/:id",authenticate,async (req,res)=>{
    try{
        const projectId = req.params.id;

        const deletedProject = await Projects.findOneAndDelete({
            _id:projectId,
            userId:req.userId
        })

        if(!deletedProject){
            return res.status(400).json({
                message :"Invalid project"
            })
        }

        res.json({
            message:"Project deleted"
        })
    }catch(err){
        return res.status(500).json({
            message:"Error occured in deletion"
        })
    }
})

module.exports = router;