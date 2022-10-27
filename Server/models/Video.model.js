const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
        avatar: { type: String, required: true },
        cloudinary_id: { type: String, required: true },
        videoName: { type: String, required: true },
        title: {type:String, required: true},
        description: {type:String, required: true},
        thumbnail_cloudinary_id:{type:String, required:true},
        thumbnail_avatar:{type:String,required:true},
        userName: { type: String, required: true },
        userId: {type:String, required:true},
        likes: [{type:String, default:[]}],
        dislikes: [{type:String, default:[]}] ,
        tags: [{ type: String,default:[] }],
        isPrivate: {type:Boolean, default:true}
})
const Video = new mongoose.model("video", videoSchema);
module.exports = Video;