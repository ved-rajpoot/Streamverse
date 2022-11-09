const Room = require("../models/Room.model");


const LeaveRoom = (socket, io) => {
    socket.on("leaveRoom", (res) => {
        console.log(res)
        const room_id = res.roomID
        const userName = res.userName
        const userID = res.userID
        const type = res.type
        Room.findOneAndUpdate({ _id: room_id }, {
            $pull: { "userArray": { userId: userID, userName: userName } }
        }, { new: true })
            .then(async (room) => {
                if (!room) {
                    // socket.emit('validateRoom', false)
                } else {
                    // socket.emit('validateRoom', true);
                    await socket.leave(room_id.toString())
                    await socket.leave(userID.toString());
                    console.log(room)
                    io.sockets.in(room._id.toString()).emit('userLeft', { userName: userName, userId: userID.toString(), type:type })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })

}

module.exports = LeaveRoom;