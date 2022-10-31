const Room = require("../models/Room.model"); 


const JoinRoom = (socket,io) => {
    socket.on("joinRoom", (res, cb) => {
        const room_id = res.roomID
        const userName = res.joinUserName
        const userID = res.userID
        Room.findOneAndUpdate({ _id: room_id }, {
            $push:{ "userArray": { userId: userID, userName: userName } }
        },{new : true})
            .then(async (room) => {
                if (!room) {
                    // socket.emit('validateRoom', false)
                } else {
                    // socket.emit('validateRoom', true);
                    await socket.join(room_id.toString())
                    io.sockets.in(room_id.toString()).emit('userJoined', { userName: userName })
                    cb(room)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
    
}

module.exports = JoinRoom;