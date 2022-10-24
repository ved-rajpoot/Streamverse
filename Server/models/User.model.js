const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    publicVideos: [{
        avatar: { type: String, required: true },
        cloudinary_id: { type: String, required: true },
        videoName: { type: String, required: true }
    }],
    privateVideos: [{
        avatar: { type: String, required: true },
        cloudinary_id: { type: String, required: true },
        videoName: { type: String, required: true }
    }]
})
const User = new mongoose.model("User", userSchema);
module.exports = User