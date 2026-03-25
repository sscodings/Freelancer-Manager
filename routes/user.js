const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
const { User,Projects } = require("../db");
const { JWT_secret } = require("../config");

const signUpBody = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string()
});

router.post("/signup",async(req,res)=>{
    const { success } = signUpBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"invalid inputs"
        })
    }
    const existingUser = await User.findOne({
        name:req.body.name
    })
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({userId},JWT_secret);

    res.json({
        message:"User successfully created",
        token:token
    })
})

const signInBody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
    const { success } = signInBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Invalid Inputs"
        })
    }

    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_secret)
        return res.json({
            token:token
        })
        return;
    }
})

module.exports = router;