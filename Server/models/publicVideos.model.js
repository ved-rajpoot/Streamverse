const mongoose = require("mongoose")

const publicVideoSchema = new mongoose.Schema({
        avatar: { type: String, required: true },
        cloudinary_id: { type: String, required: true },
        // userName: { type: String, required: true },
        videoName: { type: String, required: true },
        // categories: [{ type: String }]
})
const publicVideo = new mongoose.model("publicVideo", publicVideoSchema);
module.exports = publicVideo