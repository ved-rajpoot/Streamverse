const mongoose = require("mongoose")

const audioSchema = new mongoose.Schema({
    avatar: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    audioName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail_cloudinary_id: { type: String, required: true },
    thumbnail_avatar: { type: String, required: true },
    likes: [{type:String, default:[]}],
    dislikes: [{type:String, default:[]}] ,
    isPrivate: {type:Boolean, default:false},
    userName: { type: String, required: true },
    userId: {type:String, requied:true},
    tags: [String]
})
const Audio = new mongoose.model("Audio", audioSchema);
module.exports = Audio