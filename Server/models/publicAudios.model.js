const mongoose = require("mongoose")

const publicAudioSchema = new mongoose.Schema({
    avatar: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    audioName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail_cloudinary_id: { type: String, required: true },
    thumbnail_avatar: { type: String, required: true },
    userName: { type: String, required: true }
})
const publicAudio = new mongoose.model("publicAudio", publicAudioSchema);
module.exports = publicAudio