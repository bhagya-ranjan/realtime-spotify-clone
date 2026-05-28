import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    artist : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    audioUrl:{
        type : String,
        required : true
    },
    duration:{
        type : Number,
        required : true
    },
    //optional for a song to have an album id
    //foriegn key
    albumId:{
        //mongoose creates unique id for every album which is stored in a bobjectId format
        //so here in type we wrote this to tell that albumid here will also be in objectid format
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Album', //referencing to album model
        required : false
    }
}, {timestamps  : true});

export const Song = mongoose.model("Song" , songSchema);