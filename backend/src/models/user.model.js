import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    imageUrl:{
        type : String,
        required : true
    },
    clerkId : {
        type : String,
        required : true,
        unique : true
    }
    //authentication is being done by clerk , it  provides a unique id to each user , we need to keep a track of that id in our database
} , {timestamps : true}); //createdAt , updatedAt


export const User = mongoose.model("User" , userSchema)