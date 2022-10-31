const Room = require("../models/Room.model"); 


const JoinRoom = (socket,io) => {
    socket.on("joinRoom", (res, cb) => {
        const room_id = res.roomID
        const userName = res.joinUserName
        Room.findOneAndUpdate({ _id: room_id }, {
            $push:{ "userArray": { userId: socket.id, userName: userName } }
        },{new : true})
            .then(async (room) => {
                // console.log(room)
                if (!room) {

                    socket.emit('validateRoom', false)
                } else {
                    // console.log("here")
                    // socket.emit('validateRoom', true);
                    await socket.join(room_id)
                    io.in(room_id).to(room.userArray[0].userId).emit('userJoined', { userName: userName })
                    cb(room)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
    
}

module.exports = JoinRoom;