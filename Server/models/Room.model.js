const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    AdminID: { type: String, required: true },
    userArray: [{
        userId: { type: String },
        userName: { type: String },
        role: {type:String},
    }]
})
const Room = new mongoose.model("Room", RoomSchema);
module.exports = Room;