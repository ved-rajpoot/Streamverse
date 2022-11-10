const mongoose = require("mongoose")

const audioSchema = new mongoose.Schema({
    audioPath: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    isPrivate: {type:Boolean, default:false},
    userName: { type: String, required: true },
    userId: {type:String, requied:true},
    date: {type:Date,default:Date.now}
})
const Audio = new mongoose.model("Audio", audioSchema);
module.exports = Audio