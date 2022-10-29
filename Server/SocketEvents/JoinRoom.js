const Room = require("../models/Room.model"); 

const JoinRoom = (socket) => {
    socket.on("joinRoom", (room_id, userName,cb) => {
        Room.findOneAndUpdate({ id: room_id, }, { new: true }, {
            $addToSet: { userArray: { userId: socket.id, userName: userName } },
        })
            .then((room) => {
                if (!room) {
                    socket.emit('validateRoom', false)
                } else {
                    socket.emit('validateRoom', true);
                    socket.join(room_id);
                    // socket.to(room_id).emit('userJoined', { userName: userName })
                    
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
    
}

module.exports = JoinRoom;