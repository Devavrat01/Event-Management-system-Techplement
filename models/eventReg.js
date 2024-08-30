const express=require('express')
const mongoose=require('mongoose')
const {Schema}=mongoose;

const eventUserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    }
})

const EventUser=mongoose.model('EventUser',eventUserSchema);
module.exports=EventUser;