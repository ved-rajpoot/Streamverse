const Room = require("../models/Room.model");


const SendMessage = (socket, io) => {
    socket.on("send", (res, cb) => {
        const userID = socket.id;
        const room_id = res.roomID;
        const message = res.message;
        Room.findOne({ _id: room_id })
            .then((room) => {
                const data = room.userArray;
                console.log(room)
                const index = data.map(e => e.userId).indexOf(userID);
                console.log(index)
                io.in(room_id).to(room.userArray[0].userId).emit('recieve', { userName: room.userArray[index].userName , message:message})
            })
            .catch((err) => {
                console.log(err)
            })
    })

}

module.exports = SendMessage;