const express = require("express");
const mongoose = require("mongoose");
const { date } = require("zod");
const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://sscodings:ssrockstar.11@sscodings.mvywr1x.mongodb.net/Freelace");

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const ProjectSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    clientName:String,
    description:String,
    status:String,
    paymentStatus:String,
    amount:Number,
    deadline:Date
});

const User = mongoose.model('User',UserSchema);
const Projects = mongoose.model('Projects',ProjectSchema);

module.exports = {
    User,
    Projects
}