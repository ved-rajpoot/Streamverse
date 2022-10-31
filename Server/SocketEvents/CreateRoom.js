const Room = require("../models/Room.model");

const CreateRoom = (socket) => {
    socket.on("createRoom", (res, cb) => {
        const roomName = res.roomName;
        const userName = res.createUserName;
        const room = new Room({
            roomName: roomName,
            userArray: [{
                userId: socket.id,
                userName: userName
            }]
        })
        room
            .save()
            .then(async (room) => {
                await socket.join(room._id)
                cb({
                    userName: userName,
                    roomID: room._id,
                    roomName: roomName
                })
            })
    })

}

module.exports = CreateRoom;