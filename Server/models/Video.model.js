const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
        videoPath: { type: String, required: true },
        title: {type:String, required: true},
        description: {type:String, required: true},
        thumbnailPath:{type:String, required:true},
        views:{type:Number,default:0},
        userName: { type: String, required: true },
        userId: {type:String, required:true},
        likes: {type:Number,default:0},
        dislikes: {type:Number,default:0} ,
        tags: [{ type: String,default:[] }],
        isPrivate: {type:Boolean, default:true},
        date: { type: Date, default: Date.now}
})
const Video = new mongoose.model("video", videoSchema);
module.exports = Video;